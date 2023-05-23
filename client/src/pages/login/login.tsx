import { Card, Form, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { Button } from "../../components/button/Button";
import { CustomInput } from "../../components/customInput/CustomInput";
import { ErrorMessage } from "../../components/error-message";
import { Layout } from "../../components/layout/layout";
import { PasswordInput  } from "../../components/passwordInput/PaswordInput";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const Login = () => {
    const [loginUser, loginUserResult] = useLoginMutation()
    const [error, setError] = useState('')

    const login = async (data: UserData) => {
        try {
            await loginUser(data).unwrap();

        } catch (err) {
            const maybeError = isErrorWithMessage(err)

            if(maybeError) {
                setError(err.data.message)
            } else {
                setError('unexpected error!')
            }
        }
    }

    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Enter" style={{ width: "30rem"}}>
                    <Form onFinish={login}>
                        <CustomInput 
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                        <PasswordInput 
                            name="password"
                            placeholder="Password"
                        />
                        <Button
                            type='primary'
                            htmlType='submit'
                        >
                            Login
                        </Button>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            No account? <Link to={ Paths.register }>Authorization</Link> 
                        </Typography.Text>
                        <ErrorMessage message={error}/>
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}