import { Employee } from '@prisma/client'
import { Row } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editEmployee, useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees'
import EmployeeForm from '../../components/employeeForm/employeeForm'
import { Layout } from '../../components/layout/layout'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'

export default function EditEmployee() {
    const nav = useNavigate()
    const params = useParams<{ id: string }>()
    const [error, setError] = useState("")
    const { data, isLoading } = useGetEmployeeQuery(params.id || "")
    const [ editEmployee ] = useEditEmployeeMutation()

    if( isLoading ) {
        return <span>Loading</span>
    }

    const handleEdirUser = async (employee: Employee) => {
        try{
            const editedEmployee = {
                ...data,
                ...employee
            }

            await editEmployee(editedEmployee).unwrap()

            nav(`${Paths.status}/updated`)
        } catch (error) {
            const maybeError = isErrorWithMessage(error)

            if(maybeError) {
                setError(error.data.message)
            } else {
                setError('unexpected error')
            }
        }
    }

    return (
        <Layout>
            <Row align="middle" justify="center">
                <EmployeeForm 
                    title="edit employee"
                    btnText="edit"
                    error={ error }
                    employee={ data }
                    onFinish={ handleEdirUser }
                />
            </Row>
        </Layout>
    )
}