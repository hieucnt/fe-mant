import {Row, Col } from "antd";
import ListSupported from "./components/ListSupported";

import './style.scss';

const TemplatesComponent = () => {
  return (
    <div>
        <Row className="template--container">
          <Col span={6}><img className="template--image" src="https://concept.mant.vn/wp-content/uploads/nbdesigner/designs/fbd7d991667896640/preview/frame_0.png" alt="" /></Col>
          {/* <Col span={18}><ListSupported /></Col> */}
        </Row>
        <Row>
          <ListSupported/>
        </Row>
    </div>
  );
};

export default TemplatesComponent;
