import { TeamOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { Layout, Space, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, selectUser } from '../../features/auth/authSlice'
import { Paths } from '../../paths'
import { Button } from '../button/Button'
import s from './header.module.scss'

export const Header = () => {
    const user = useSelector(selectUser)
    const nav = useNavigate()
    const dispatch = useDispatch()

    const OnLogoutClick = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        nav('/login')
    }

    return (
        <Layout.Header className={ s.header }>
            <Space>
                <TeamOutlined className={s.teamIcon}></TeamOutlined>
                <Link to={ Paths.home }>
                    <Button type='ghost'>
                        <Typography.Title level={ 1 }>Employees</Typography.Title>
                    </Button>
                </Link>
            </Space>
            {
                user ? (
                    <Button 
                    type='ghost' 
                    icon={ <LogoutOutlined/> }
                    onClick={ OnLogoutClick }
                    >
                        Logout
                    </Button>
                )
            :
            (
            <Space>
                <Link to={ Paths.register }>
                    <Button icon={ <UserOutlined /> } type='ghost'>registration</Button>
                </Link>
                <Link to={ Paths.login }>
                    <Button icon={ <LoginOutlined /> } type='ghost'>login</Button>
                </Link>
            </Space>
            )}
        </Layout.Header>
    )
}