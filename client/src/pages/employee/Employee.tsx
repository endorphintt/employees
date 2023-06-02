import { Descriptions, Divider, Modal, Space } from 'antd'
import { Layout } from '../../components/layout/layout'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees'
import { selectUser } from '../../features/auth/authSlice'
import { Button } from '../../components/button/Button'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ErrorMessage } from '../../components/error-message'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'

export default function Employee() {
    const nav = useNavigate()
    const [ error, setError ] = useState("")
    const params = useParams<{id: string}>()
    const [ isModalOpen, setIsModalOpen] = useState(false)
    const { data, isLoading } = useGetEmployeeQuery(params.id || "")
    const [ removeEmployee ] = useRemoveEmployeeMutation()
    const user = useSelector(selectUser)

    if(isLoading) {
        return <span>Loading</span>
    } 

    if( !data ) {
        return <Navigate to='/'/>
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const hideModal = () => {
        setIsModalOpen(false)
    }

    const handleDeleteUser = async () => {
        setIsModalOpen(false)

        try {
            await removeEmployee(data.id).unwrap()

            nav(`${Paths.status}/deleted`)
        } catch (error) {
            const maybeError = isErrorWithMessage(error)
            if( maybeError) {
                setError(error.data.message)
            } else {
                setError('unexpected error')
            }
        }
    }

    return (
        <Layout>
            <Descriptions title="employee info" bordered>
                <Descriptions.Item label="Name" span={ 3 }>
                    { `${data.firstName} ${data.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label="Age" span={ 3 }>
                    {data.age}
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={ 3 }>
                    {data.address}
                </Descriptions.Item>
            </Descriptions>
            {user?.id === data.userId && (
                    <>
                        <Divider orientation='left'>actions</Divider>
                        <Space>
                            <Link to={ `/employees/edit/${data.id}`}>
                                <Button
                                    shape='round'
                                    type='default'
                                    icon={ <EditOutlined/> }
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                shape="round"
                                danger
                                onClick={showModal}
                                icon={ <DeleteOutlined/> }
                            >
                                Delete
                            </Button>
                        </Space>
                    </>
                )
            }
            <ErrorMessage message={ error }/>
            <Modal
                title='confirm deleting'
                open={ isModalOpen }
                onOk={ handleDeleteUser }
                onCancel={ hideModal }
                okText="Confirm"
                cancelText="cancel"     
                >
                    Are you sure?
            </Modal>
        </Layout>
    )
}

