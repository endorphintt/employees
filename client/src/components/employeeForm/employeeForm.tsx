import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { Button } from "../button/Button";
import { CustomInput } from "../customInput/CustomInput";
import { ErrorMessage } from "../error-message";

type Props<T> = {
    onFinish: (value: T) => void;
    btnText: string;
    title: string;
    error?: string;
    employee?: T
}

export default function EmployeeForm({
    onFinish,
    title,
    btnText,
    error,
    employee
}: Props<Employee>) {
  return (
    <Card
        title={ title }
        style={{width: '30rem'}}
    >
        <Form
            name="employee-form"
            onFinish={ onFinish }
            initialValues={ employee }
        >   
            <CustomInput type="text" name="firstName" placeholder="First name"/>
            <CustomInput type="text" name="lastName" placeholder="Second name"/>
            <CustomInput type="number" name="age" placeholder="Age"/>
            <CustomInput type="text" name="address" placeholder="Address"/>
            <Space>
                <ErrorMessage message={error} />
                <Button htmlType="submit" >
                    { btnText}
                </Button>
            </Space>
        </Form>
    </Card>
  )
}
