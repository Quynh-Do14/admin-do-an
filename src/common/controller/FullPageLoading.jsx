import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
/**
 * Full page loading
 */
export const FullPageLoading = ({ isLoading }) => {
  return (
    <>
      {isLoading == true ? (
        <div className={"full_page_loading"}>
          <LoadingRegion size={"large"} tip={null} />
        </div>
      ) : null}
    </>
  );
};
/**
 * Loading spin
 */
export const LoadingRegion = ({ tip, color = "#FFFFFF", size }) => {
  return (
    <>
      <Spin
        tip={tip}
        size={size}
        style={{ color: color }}
        indicator={<LoadingOutlined spin />}
      />
      {/* <p style={{ color: color }}>Loading</p> */}
    </>
  );
};
