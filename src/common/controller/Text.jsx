import { Typography } from 'antd';
import React from 'react';

const { Text, Title, Link } = Typography;

export const NormalText = ({ className, children, ...props }) => {
    return <Text
                className={className.join(" ")}
                {...props}
            >  
                {children}  
            </Text>
};

export const BoldText = ({ className, children, ...props }) => {
    return <Text
                className={className.join(" ")}
                {...props}
            >  
                {children}  
            </Text>
};
