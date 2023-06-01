import { Employee } from "@prisma/client";
import { Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddEmployeeMutation } from "../../app/services/employees";
import EmployeeForm from "../../components/employeeForm/employeeForm";
import { Layout } from "../../components/layout/layout";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export default function AddEmployee() {
    const [error, setError] = useState("")
    const nav = useNavigate()
    const user = useSelector(selectUser)
    const [addEmployee] = useAddEmployeeMutation()

    useEffect(() => {
        if(!user) {
            nav('/login')
        }
    },[user, nav])

    const  handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap()

            nav(`${Paths.status}/created`)
        } catch (err){
            const maybeError = isErrorWithMessage(err)

            if(maybeError) {
                setError(err.data.message)
            } else {
                setError('unexpected error')
            }
        }
    }
    return (
    <Layout>
        <Row
            align="middle"
            justify="center"
        >
            <EmployeeForm 
                title="add employee"
                btnText="add"
                onFinish={ handleAddEmployee }
                error={ error }
            />
        </Row>
    </Layout>
  )
}
