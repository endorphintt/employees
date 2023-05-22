import { TeamOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'
import { Layout, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'
import { Button } from '../button/Button'
import s from './header.module.scss'

export const Header = () => {
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
            <Space>
                <Link to={ Paths.register }>
                    <Button icon={ <UserOutlined /> } type='ghost'>registration</Button>
                </Link>
                <Link to={ Paths.login }>
                    <Button icon={ <LoginOutlined /> } type='ghost'>login</Button>
                </Link>
            </Space>
        </Layout.Header>
    )
}