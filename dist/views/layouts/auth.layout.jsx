const React = require('react');
const { Component } = React;
const { Layout, Menu } = require('antd');
const { Header, Footer, Content, Breadcrumb } = Layout;

module.exports.AuthLayout = class AuthLayout extends Component{
    constructor(props) {
        super(props);
        this.props = props;
    }

    render(){
        return (
        <html lang="en">
            <head>
                <link rel={"stylesheet"} href={"/css/antd.css"} type={"text/css"}/>
                <title>{this.props.title}</title>
            </head>
            <body>
            <Layout style={{ height: "100vh" }} className={"layout"}>
                <Header>
                    <div className="logo"/>
                    <Menu theme={"dark"} mode={"horizontal"} activeKey={[this.props.menu]}>
                        <Menu.Item key={"home"}>
                            <a href="/">Home</a>
                        </Menu.Item>
                        <Menu.Item key={"register"}>
                            <a href="/auth/register">Register</a>
                        </Menu.Item>
                        <Menu.Item key={"login"}>
                            <a href="/auth/login">Login</a>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {this.props.breadcrumb}
                    </Breadcrumb>
                    <div className="site-layout-content">
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Coden Company ©2020</Footer>
            </Layout>
            </body>
        </html>
        );
    }
}
