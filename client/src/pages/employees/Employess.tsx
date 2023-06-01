import { Layout } from "../../components/layout/layout"
import { Button } from "../../components/button/Button"
import { PlusCircleOutlined } from "@ant-design/icons"
import { Table } from "antd"
import { useGetAllEmployeesQuery } from "../../app/services/employees"
import type { ColumnsType } from "antd/es/table"
import { Employee } from "@prisma/client"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../paths"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { useEffect } from "react"

const columns: ColumnsType<Employee> = [
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName'
    },
    {
        title: 'age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'address',
        dataIndex: 'address',
        key: 'address'
    },
]

export const Employees = () => {
    const nav = useNavigate()
    const user = useSelector(selectUser)
    const { data, isLoading } = useGetAllEmployeesQuery();

    const goToAddUser = () => {
        nav(Paths.employeeAdd)
    }

    useEffect(() => {
        if(!user) {
            nav('/login')
        }
    },[nav, user])

    return (
       <Layout>
            <Button type='primary' onClick={ goToAddUser } icon={ <PlusCircleOutlined/>}>
                ADD EMPLOYEE
            </Button>
            <Table
                loading={ isLoading }
                dataSource={ data }
                pagination={ false }
                columns={ columns }
                rowKey={ (record) => record.id}
                onRow={(record) => {
                    return {
                        onClick: () => nav(`${Paths.employee}/${record.id}`)
                    }
                }}
            />
       </Layout>
    )
}
