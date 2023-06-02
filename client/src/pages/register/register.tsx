import { User } from "@prisma/client";
import { Card, Form, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../app/services/auth";
import { Button } from "../../components/button/Button";
import { CustomInput } from "../../components/customInput/CustomInput";
import { ErrorMessage } from "../../components/error-message";
import { Layout } from "../../components/layout/layout";
import { PasswordInput  } from "../../components/passwordInput/PaswordInput";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

type RegisterD = Omit<User, "id"> & { confirmPassword: string }

export const Register = () => {
    const nav = useNavigate()
    const user = useSelector(selectUser)
    const [error, setError] = useState("")
    const [registerUser] = useRegisterMutation()

    const register = async (data: RegisterD) => {
        try{
            await registerUser(data).unwrap()

            nav('/')
        } catch (error) {
            const maybeError = isErrorWithMessage(error)

            if(maybeError) {
                setError(error.data.message)
            } else {
                setError('unexpected error!')
            }
        }
    }

    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Registration" style={{ width: "30rem"}}>
                    <Form onFinish={register}>
                        <CustomInput 
                            type="text"
                            name="name"
                            placeholder="name"
                        />
                        <CustomInput 
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                        <PasswordInput 
                            name="password"
                            placeholder="Password"
                        />
                        <PasswordInput 
                            name="ConfirmPassword"
                            placeholder="ConfirmPassword"
                        />
                        <Button
                            type='primary'
                            htmlType='submit'
                        >
                            Register
                        </Button>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            have you already created the account? <Link to={ Paths.login }>Login</Link> 
                        </Typography.Text>
                        <ErrorMessage message={ error }/> 
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}