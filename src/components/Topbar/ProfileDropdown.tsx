import React, { useState, useEffect } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { ProfileOption } from '@/Layouts/Topbar';
import { useToggle } from '@/hooks';

type ProfileDropdownProps = {
    menuItems: Array<ProfileOption>;
    userImage: string;
    username: string;
};

const ProfileDropdown = ({ userImage, username }: ProfileDropdownProps) => {
    const [isOpen, toggleDropdown] = useToggle();
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isOpen) {
            const id = setTimeout(() => {
                toggleDropdown();
            }, 3000);
            setTimeoutId(id);
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(null);
            }
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(null);
            }
        };
    }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent default behavior of the button
        toggleDropdown(); // Toggle the dropdown
    };

    return (
        <Dropdown show={isOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                className="nav-link dropdown-toggle arrow-none nav-user"
                as="button"
                onClick={handleToggleClick}
                style={{
                    backgroundColor: 'transparent',
                    color: 'inherit',
                    textDecoration: 'none',
                    outline: 'none',
                }}
            >
                <span className="account-user-avatar">
                    <Image src={userImage} alt="user-image" width={26} className="rounded-circle" />
                </span>
                <span className="d-lg-block d-none">
                    <h5 className="my-0 fw-normal">
                        {username} <i className="ri-arrow-down-s-line d-none d-sm-inline-block align-middle" />
                    </h5>
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="dropdown-menu-animated profile-dropdown">
                <div>
                    <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">
                            Welcome, &nbsp;
                            <span
                                style={{
                                    color: '#04B3E5',
                                    fontFamily: 'cursive',
                                    fontWeight: 300,
                                }}
                            >
                                {username}
                            </span>
                        </h6>
                    </div>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
