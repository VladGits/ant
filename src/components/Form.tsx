import {
  Button,
  Card,
  Col,
  Form,
  Row,

} from "antd";
import "./App.css";
import { useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import TextArea from "antd/es/input/TextArea";

dayjs.locale("ru");

interface FormValues {
  name: string;
}

export const FormComponent = () => {
    const items = [
        {
          id: 1,
          title: "Пункт 1",
          children: [
            {
              id: 2,
              title: "Подпункт 1.1",
              children: [
                {
                  id: 3,
                  title: "Подпункт 1.1.1",
                },
              ],
            },
            {
              id: 4,
              title: "Подпункт 1.2",
            },
          ],
        },
        {
          id: 5,
          title: "Пункт 2",
          children: [
            {
              id: 6,
              title: "Подпункт 2.1",
            },
          ],
        },
        {
          id: 7,
          title: "Пункт 3",
        },
      ];
      // const { dateRange } = useDateStore();
      // const [showAlert, setShowAlert] = useState(false);
    
      // useEffect(() => {
      //   if (showAlert) {
      //     message.success("Success");
      //     setShowAlert(false);
      //   }
      // }, [showAlert]);
    
      // const tags = [
      //   'Tag-1000000000 ', 'Tag-2222222222', 'Tag-3 22222222',
      //   'Tag-4', 'Tag-5',
      //   'Tag-6', 'Tag-7',
      //   // 'Tag-8', 'Tag-9', 'Tag-10'
      // ];
      const changeHandler = (changedFields: any[], allFields: any[]) => {
        // console.log(changedFields);
      };
      const [form] = Form.useForm();
      const value = Form.useWatch(["select2"], form);
      const options = [
        { value: "1", label: "one" },
        { value: "2", label: "two" },
      ];
      const label = options.find((o) => o.value === value)?.label;
    
      useEffect(() => {
        form.setFieldValue("select", { value, label });
      }, [value]);
    
      return (
        <>
          <Row gutter={12} style={{ height: '100vh' }}>
            <Col span={6}>
              <Card>
                left
              </Card>
            </Col>
            <Col span={18} style={{ display: 'flex', flexDirection: 'column' }}>
              <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Form
                    form={form}
                    onFieldsChange={changeHandler}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Form.Item style={{ marginBottom: 0, flex: 1 }}>
                        <TextArea style={{ height: 40, resize: 'vertical' }} />
                      </Form.Item>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Button size="middle" style={{ height: 40 }}>
                          Submit
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
                <Button
                  size="large"
                  type="primary"
                  style={{
                    position: 'sticky',
                    top: '100px',
                    bottom: 0,
                    left: 0,
                    right: 0,
    
                  }}
                >
                  Apply
                </Button>
              </Card>
            </Col>
          </Row>
        </>
      );
}