const React = require('react');
const { Breadcrumb, Image } = require('antd');
const { DefaultLayout } = require( './layouts/default.layout');
module.exports = function Error(props){
    const message = props.message[0].toUpperCase() + props.message.slice(1);
    console.log(typeof props.message);
    const Bread =
        (<><Breadcrumb.Item>
            Error
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            {props.err}
        </Breadcrumb.Item>
            </>);
    return (
        <DefaultLayout
            title={"Error"}
            breadcrumb={Bread}
        >
            <h1 style={{ textAlign: 'center', fontSize: "72px" }}>{props.err} - {props.errMess}</h1>
            <div style={{ textAlign: 'center', fontSize: "24px"  }}>{message}.</div>
            <image src={"/image/error.png"} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '20%', height: '20%'}}/>
        </DefaultLayout>
    );

}

