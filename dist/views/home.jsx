const React = require('react');
const { Breadcrumb } = require('antd');
const { DefaultLayout } = require( './layouts/default.layout');
const Bread =
    (<Breadcrumb.Item>
            Home
    </Breadcrumb.Item>)

module.exports = class Home extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <DefaultLayout
                title={"Home"}
                menu={"home"}
                breadcrumb={Bread}
            >
                <h1>Hello world!</h1>
            </DefaultLayout>
        );
    }
}
