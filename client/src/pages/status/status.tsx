import { Button, Result, Row } from "antd"
import { Link, useParams } from "react-router-dom"

const Statuses: Record<string, string> = {
    created: 'user created successfully',
    updated: 'user updated successfully',
    deleted: 'user deleted successfully'
}

export default function Status() {
    const { status } = useParams()
    return (
        <Row
            align="middle"
            justify="center"
            style={{width: '100%'}}
        >   
            <Result
                status={ status ? 'success' : 404}
                title={ status ? Statuses[status] : 'not found'}
                extra={
                    <Button key="dashboard">
                        <Link to='/'>Home page</Link>
                    </Button>
                }
            />
        </Row>
    )
}
