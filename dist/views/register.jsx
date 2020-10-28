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
            <Form {...layout}  action={"/auth/register"} method={"post"}>
                <h1 style={{ textAlign:'center' }}> Register </h1>
                <div style={{ textAlign: 'center', color: props.color }}> {props.answer} </div>
                <Form.Item
                    label={"Email"}
                    rules={[{ required: true}]}
                    fieldContext={"email"}
                >
                    <Input placeholder="Email" type={"email"} name={"email"} />
                </Form.Item>
                <Form.Item
                    label={"Username"}
                    rules={[{ required: true}]}
                    fieldContext={"username"}>
                    <Input placeholder="Username" name={"username"} />
                </Form.Item>
                <Form.Item
                    label={"Password"}
                    rules={[{ required: true }]}
                    fieldContext={"password"}>
                    <Input placeholder="Password" type={"password"} name={"password"} />
                </Form.Item>
                <Form.Item
                    label={"Confirm password"}
                    rules={[{ required: true }]}
                    fieldContext={"confirmPassword"}>
                    <Input placeholder="Confirm password" type={"password"} name={"confirmPassword"} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
            </Form>
        </DefaultLayout>
    );
}
