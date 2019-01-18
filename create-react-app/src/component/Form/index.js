import React, { Component } from 'react';
import moment from 'moment';
import { Form, Icon, Upload, Input, Select, Switch, Button, DatePicker, Radio, message } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class Index extends Component {
  state = {
    valueRadio: 1
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.submit) {
          this.props.submit(values);
        }
      }
    });
  };

  onChangeRadio = e => {
    this.setState({
      valueRadio: e.target.value
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { config = [], data = {}, initialValue = {}, isBtn = true } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      }
    }; // 表单布局
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }; // 按钮布局

    return (
      <Form onSubmit={this.handleSubmit}>
        {config.map((item, index) => {
          let box;
          switch (item.type || '') {
            case 'label': {
              box = (
                <FormItem style={item.style || {}} key={index} {...formItemLayout} label={item.label || '默认值'}>
                  {'render' in item ? item.render(data[item.dataIndex], data, this.props.form, initialValue) : item.dataIndex in data ? data[item.dataIndex] : '默认值'}
                </FormItem>
              );
              break;
            }
            case 'radio': {
              box = (
                <FormItem key={index} {...formItemLayout} label={item.label || '默认值'}>
                  {getFieldDecorator(item.key || index, {
                    rules: item.rules || [
                      {
                        required: true,
                        message: '请选择选项'
                      }
                    ]
                  })(
                    <RadioGroup>
                      {item.dataIndex in data &&
                        data[item.dataIndex].map(item => (
                          <Radio key={item.value} value={item.value}>
                            {item.text}
                          </Radio>
                        ))}
                    </RadioGroup>
                  )}
                </FormItem>
              );
              break;
            }
            case 'input': {
              box = (
                <FormItem key={index} {...formItemLayout} label={item.label || '默认值'}>
                  {getFieldDecorator(item.key || index, {
                    initialValue: initialValue[item.key] || null,
                    rules:
                      item.rules || item.isPrice
                        ? item.isPrice
                          ? [
                              {
                                required: true,
                                message: '请输入文字'
                              },
                              {
                                validator: (_, value, callback) => {
                                  const reg = /^(([1-9]\d*)|0?)(\.\d+)?$/;
                                  const reg1 = /^\d*(\.)?(\d{1,2})?$/;
                                  if (reg.test(value)) {
                                    if (reg1.test(value)) {
                                      if (Number(value) < 1e7) {
                                        callback();
                                      } else {
                                        callback('超过价格范围。');
                                      }
                                    } else {
                                      callback('请输入的价格保留两位小数');
                                    }
                                  } else {
                                    callback('价格格式错误');
                                  }
                                }
                              }
                            ]
                          : item.rules
                        : [
                            {
                              required: true,
                              message: '请输入文字'
                            }
                          ]
                  })(<Input placeholder={item.tips || '请输入文字'} type={item.isPassword && 'password'} />)}
                </FormItem>
              );
              break;
            }
            case 'date': {
              box = (
                <FormItem key={index} {...formItemLayout} label={item.label || '默认值'}>
                  {getFieldDecorator(item.key || index, {
                    rules: item.rules || [{ type: 'array', required: true, message: '请选择日期' }]
                  })(
                    <RangePicker
                      disabledDate={current =>
                        // Can not select days before today and today
                        current && current < moment().startOf('day')
                      }
                      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    />
                  )}
                </FormItem>
              );
              break;
            }
            case 'select': {
              box = (
                <FormItem key={index} {...formItemLayout} label={item.label || '默认值'}>
                  {getFieldDecorator(item.key || index, {
                    initialValue: initialValue[item.key] || undefined,
                    rules: item.rules || [
                      {
                        required: true,
                        message: '请选择标签'
                      }
                    ]
                  })(
                    <Select allowClear mode={item.mode || ''} style={{ width: '100%' }} placeholder={item.tips || '请选择选项'}>
                      {item.dataIndex in data && data[item.dataIndex].map(item => <Option key={item.key}>{item.value}</Option>)}
                    </Select>
                  )}
                </FormItem>
              );
              break;
            }
            case 'textArea': {
              box = (
                <FormItem key={index} {...formItemLayout} label={item.label || '默认值'}>
                  {getFieldDecorator(item.key || index, {
                    rules: item.rules || [
                      {
                        required: true,
                        message: '请输入文字'
                      }
                    ]
                  })(<TextArea rows={4} placeholder={item.tips || '请输入文字'} />)}
                </FormItem>
              );
              break;
            }
            case 'switch': {
              let attr = {};
              if (item.key in initialValue) {
                attr = {
                  checked: initialValue[item.key]
                };
              }
              box = (
                <FormItem key={index} {...formItemLayout} label={item.label || '默认值'}>
                  {getFieldDecorator(item.key || index, {
                    initialValue: true,
                    rules: item.rules || [
                      {
                        required: true,
                        message: '请选择开关'
                      }
                    ]
                  })(<Switch checkedChildren="启用" unCheckedChildren="禁用" disabled={item.disabled || false} defaultChecked {...attr} />)}
                </FormItem>
              );
              break;
            }
            case 'uploadImg': {
              box = (
                <FormItem style={item.style || {}} key={index} {...formItemLayout} label={item.label || '默认值'}>
                  {(() => {
                    const { size = 50, num = 5 } = item;
                    const normFile = e => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      if (e.file.size > 1024 * 1024 * size) {
                        message.warn(`图片过大，请上传小于${size}M的图片。`, 2);
                        e.fileList.pop();
                        return e && e.fileList;
                      }
                      if (e.fileList.length > num) {
                        message.warn(`图片上传不能超过${num}张`, 2);
                        e.fileList.pop();
                        return e && e.fileList;
                      }
                      return e && e.fileList;
                    };
                    const uploadButton = (
                      <div>
                        <Icon type="plus" />
                        <div className="ant-upload-text">图片上传</div>
                      </div>
                    );
                    return (
                      <div className="clearfix">
                        {getFieldDecorator(item.key || index, {
                          initialValue: initialValue[item.key] || [],
                          valuePropName: 'fileList',
                          getValueFromEvent: normFile,
                          rules: item.rules || [
                            {
                              required: true,
                              message: '图片不能为空'
                            }
                          ]
                        })(
                          <Upload name="file" headers={{ token: sessionStorage.getItem('token') }} action="/api/upload/uploadProductByFile" listType="picture-card">
                            {uploadButton}
                          </Upload>
                        )}
                      </div>
                    );
                  })()}
                </FormItem>
              );
              break;
            }
            default:
              box = '';
              break;
          }
          return box;
        })}

        {isBtn && (
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </FormItem>
        )}
      </Form>
    );
  }
}
/**
 * @param config 用于生成表单的配置项，格式如：[{...配置项}]
 * @param type 子元素类型，目前有input（输入框）|date（日期）|selectMore（下拉多选）|textArea（区域选择）|switch（开关）
 * @param label 子元素标题
 * @param tips 子元素提示信息，错误提示和输入框提示都是这个
 * @param data 子元素数据，比如selectMore里面需要这个
 * @callback submit
 */
export default Form.create({})(Index);
