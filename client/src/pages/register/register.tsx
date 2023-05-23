import { Card, Form, Row, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { CustomInput } from "../../components/customInput/CustomInput";
import { Layout } from "../../components/layout/layout";
import { PasswordInput  } from "../../components/passwordInput/PaswordInput";
import { Paths } from "../../paths";

export const Register = () => {
    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Registration" style={{ width: "30rem"}}>
                    <Form onFinish={() => null}>
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
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}