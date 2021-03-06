/* eslint-disable react/require-default-props */

import { PlusCircleOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import Draggable from 'react-draggable';

interface Iprops {
  ModalComponent: React.ElementType;
  title: string;
  data: any;
  setData?: any;
  buttonText?: string;
  windowWidth?: number;
}

function DraggableModal(props: Iprops) {
  const { ModalComponent, title, data, setData, buttonText, windowWidth } =
    props;

  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = React.createRef<any>();

  const onStart = (event: any, uiData: any) => {
    console.log(event);
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
        icon={<PlusCircleOutlined />}
      >
        {buttonText || ''}
      </Button>
      <Modal
        title={
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          <div
            className="secondary-title"
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
          >
            {title}
          </div>
        }
        destroyOnClose
        width={windowWidth || 780}
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
        centered
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <ModalComponent
          data={data}
          setData={setData}
          setModalVisible={setVisible}
        />
      </Modal>
    </>
  );
}

export default DraggableModal;
