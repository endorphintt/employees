import { Card, Form, Row, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { CustomInput } from "../../components/customInput/CustomInput";
import { Layout } from "../../components/layout/layout";
import { PasswordInput  } from "../../components/passwordInput/PaswordInput";
import { Paths } from "../../paths";

export const Login = () => {
    return (
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Enter" style={{ width: "30rem"}}>
                    <Form onFinish={() => null}>
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
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}