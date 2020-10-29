const React = require('react');
const { Breadcrumb, Form, Input, Button, Typography } = require('antd');
const { Link } =Typography;
const { DefaultLayout } = require( './layouts/default.layout');

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 11,
        span: 16,
    },
};
const tailLayoutLink = {
    wrapperCol: {
        offset: 10,
        span: 16,
    },
};

module.exports = function Profile(props){
    const Bread =
        (<>
            <Breadcrumb.Item>
                Profile
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                {props.currentUser.username}
            </Breadcrumb.Item>
            </>)
    console.log(props);
    return (
        <DefaultLayout
            title={"Home"}
            menu={"home"}
            breadcrumb={Bread}
            {...props}
        >
            <h1 style={{textAlign: 'center'}}>Profile - {props.currentUser.username}</h1>
            <div style={{textAlign:'center', color: props.color}}>{props.answer}</div>
            <Form {...layout} action={"/profile"} method={"post"}>
                <Form.Item label={"Email"} fieldcontext={"email"}>
                    <Input type={"email"} name={"email"} value={props.currentUser.email} />
                </Form.Item>
                <Form.Item label={"Username"} fieldcontext={"username"}>
                    <Input type={"text"} name={"username"} value={props.currentUser.username} />
                </Form.Item>
                <Form.Item fieldcontext={"submit"} {...tailLayout}>
                    <Button type={"primary"} htmlType={"submit"}>
                        Save
                    </Button>
                </Form.Item>
                <Form.Item fieldcontext={"submit"} {...tailLayoutLink}>
                    <Link href={"/profile/changePassword"}>
                        Want to change password?
                    </Link>
                </Form.Item>
            </Form>
        </DefaultLayout>
    );
}
