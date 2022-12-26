import React, { useEffect, useState } from 'react';
import { Col, Input, Row } from 'antd';
import '../Style/FormView.css'


const FormView = (props) => {
    const { label, validate } = props;

    const [value, setValue] = useState ();

    const onChange = (e) => {
        setValue(e.target.value || null)
    }

    return (
        <div className='view-main'>
            <Col span={30} className='col-view'>
                <Row >
                    <Col span={6} className='label-view' style={{ color: '#000' }}>
                        {label}:
                    </Col>

                    <Col span={16} className='input-view'>
                        <input
                            value={value}
                            onChange={onChange}
                        />
                    </Col>
                </Row>
            </Col>

        </div>
    )

}
export default FormView;