const React = require('react');
const { Component } = React;
const { Layout, Menu, Breadcrumb } = require('antd');
const { Header, Content, Footer } = Layout;

module.exports.DefaultLayout = function(props){
    return (
        <html>
        <head>
            <link rel={"stylesheet"} href={"/css/antd.css"} type={"text/css"}/>
            <title>{props.title}</title>
        </head>
        <body>
        <Layout style={{ minHeight: "100%" }} className={"layout"}>
            <Header>
                <div className="logo"/>
                <Menu theme={"dark"} mode={"horizontal"} activeKey={[props.menu]}>
                    <Menu.Item key={"home"}>
                        <a href="/">Home</a>
                    </Menu.Item>
                    <Menu.Item key={"register"}>
                        <a href="/auth/register">Register</a>
                    </Menu.Item>
                    <Menu.Item key={"login"}>
                        <a href="/auth/login">Login</a>
                    </Menu.Item>
                    {props.isAuth?<Menu.Item key={"profile"}><a href={"/profile"}>{props.currentUser.username} - profile</a></Menu.Item>:<></>}
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    {props.breadcrumb}
                </Breadcrumb>
                <div className="site-layout-content" >
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Coden Company ©2020</Footer>
        </Layout>
        </body>
        </html>
    );
}
