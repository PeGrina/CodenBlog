const React = require('react');
const { Component, useState } = React;
const { DefaultLayout } = require('./layouts/default.layout');
const { Form, Icon, Input, Button, Breadcrumb } = require('antd');
const Bread =
    (<>
        <Breadcrumb.Item>
            Auth
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            Login
        </Breadcrumb.Item>
    </>)
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
        offset: 10,
        span: 16,
    },
};

module.exports = function Login(props){
    console.log(props);
    return (
        <DefaultLayout
            title={"Login page"}
            menu={"login"}
            breadcrumb={Bread}
        >
            <Form {...layout} action={"/auth/login"} method={"post"}>
                <h1 style={{ textAlign:'center' }}> Login </h1>
                <div style={{ textAlign: 'center', color: props.color }}> {props.answer} </div>
                <Form.Item
                        label={"Login"}
                        rules={[{ required: true}]}
                        fieldContext={"username"}
                    >
                    <Input placeholder="Username" name={"username"} />
                </Form.Item>
                <Form.Item
                    label={"Password"}
                    rules={[{ required: true}]}
                     fieldContext={"password"}>
                    <Input placeholder="Password" name={"password"} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Log in</Button>
                </Form.Item>
            </Form>
        </DefaultLayout>
    );
}
