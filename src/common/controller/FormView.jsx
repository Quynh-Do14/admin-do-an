import React, { useEffect, useState } from 'react';
import { Col, Input, Row } from 'antd';
import '../Style/FormView.css'
import { Divider, Radio, Typography } from 'antd';

const { Paragraph } = Typography;
const FormView = (props) => {
    const { label, data, scroll } = props;

    return (
        <div className='view-main'>
            <Col span={30} className='col-view'>
                <Row >
                    <Col span={6} className='label-view' style={{ color: '#000' }}>
                        {label}:
                    </Col>
                    {
                        !scroll ?
                            <Col span={18} className='data-view'>
                                <Paragraph>
                                    {data}
                                </Paragraph>

                            </Col>
                            :
                            <Col span={18} className='data-view data-view-scroll'>
                                <Paragraph
                                    copyable={{
                                        tooltips: false,
                                    }}
                                >
                                    {data}
                                </Paragraph>
                            </Col>
                    }

                </Row>
            </Col>

        </div>
    )

}
export default FormView;