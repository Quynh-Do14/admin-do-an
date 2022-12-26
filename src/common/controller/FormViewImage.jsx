import React, { useEffect, useState } from 'react';
import { Col, Input, Row } from 'antd';
import '../Style/FormView.css'
import { Divider, Radio, Typography } from 'antd';

const { Paragraph } = Typography;
const FormViewImage = (props) => {
    const { label, data } = props;

    return (
        <div className='view-main'>
            <Col span={30} className='col-view'>
                <Row >
                    <Col span={6} className='label-view' style={{ color: '#000' }}>
                        {label}:
                    </Col>

                    <Col className='img-view'>
                        <img className='img-view-data' src={data}/>
                    </Col>


                </Row>
            </Col>

        </div>
    )

}
export default FormViewImage;