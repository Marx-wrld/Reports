## GL-FILE-TOOL

- GL file processing tool used to remove spaces and headers.

### Grafana Loki Log Aggreggation

Using Docker compose
```
mkdir grafana
mkdir loki
mkdir promtail
touch docker-compose.yml
nano docker-compose.yml # copy the contents from below
ls
docker-compose up -d --force-recreate # be sure you've created promtail-config.yml and loki-config.yml before running this
```
docker-compose.yml
```
networks:
  loki:
services:
  loki:
    image: grafana/loki:2.9.2
    volumes:
      - /home/mkuser/docker_volumes/loki:/etc/loki
    ports:
      - "3100:3100"
    restart: unless-stopped
    command: -config.file=/etc/loki/loki-config.yml
    networks:
      - loki
  promtail:
    image: grafana/promtail:2.9.2
    volumes:
      - /var/log:/var/log
      - /home/mkuser/docker_volumes/promtail:/etc/promtail
    # ports:
    #   - "1514:1514" # this is only needed if you are going to send syslogs
    restart: unless-stopped
    command: -config.file=/etc/promtail/promtail-config.yml
    networks:
      - loki
  grafana:
    image: grafana/grafana:latest
    user: "0:0"
    volumes:
    - /home/mkuser/docker_volumes/grafana:/var/lib/grafana
    ports:
      - "3000:3000"
    restart: unless-stopped
    networks:
      - loki
```
Loki config
```
nano loki/loki-config.yml
```
loki-config.yml
```
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  path_prefix: /tmp/loki
  storage:
    filesystem:
      chunks_directory: /tmp/loki/chunks
      rules_directory: /tmp/loki/rules
  replication_factor: 1
  ring:
    instance_addr: 127.0.0.1
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: 2024-06-06
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

ruler:
  alertmanager_url: http://localhost:9093
```
Promtail config
```
nano promtail/promtail-config.yml
```
promtail-config.yml
```
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:

# local machine logs

- job_name: local
  static_configs:
  - targets:
      - localhost
    labels:
      job: varlogs
      __path__: /var/log/*log
  
# docker logs

- job_name: docker 
  pipeline_stages:
    - docker: {}
  static_configs:
    - labels:
        job: dockerlogs
        __path__: /var/lib/docker/containers/*/*-json.log

# NGINX logs

- job_name: nginx
  static_configs:
  - targets:
      - localhost
    labels:
      job: nginxlogs
      __path__: /var/log/nginx/*log

# syslog target

#- job_name: syslog
#  syslog:
#    listen_address: 0.0.0.0:1514 # make sure you also expose this port on the container
#    idle_timeout: 60s
#    label_structured_data: yes
#    labels:
#      job: "syslog"
#  relabel_configs:
#    - source_labels: ['__syslog_message_hostname']
#      target_label: 'host'
```
Loki Docker Driver
```
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```
Edit daemon config 
```
sudo nano /etc/docker/daemon.json
```
daemon.json
```
{
    "log-driver": "loki",
    "log-opts": {
        "loki-url": "http://localhost:3100/loki/api/v1/push",
        "loki-batch-size": "400"
    }
}
```
Restart docker daemon
```
 sudo systemctl restart docker
```
LogQL sample queries
- Query all logs from the ```varlogs``` stream
```
{job="varlogs"}
```
- Query all logs from the ```varlogs``` stream and filter on ```docker```
```
{job="varlogs"}  |= "docker"
```
- Query all logs from the ```container_name``` label of ```uptime-kuma``` and filter on ```host``` of ```juno```
```
{container_name="uptime-kuma", host="juno"}
```
Opening Loki ports access 
```
sudo firewall-cmd --permanent --zone=public --add-port=3100/tcp

sudo firewall-cmd --permanent --zone=public --add-port=9080/tcp

sudo firewall-cmd --reload

```
