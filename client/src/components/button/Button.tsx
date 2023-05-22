import { Button as AntButton, Form } from "antd";

type Props = {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?:
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
  danger?: boolean | undefined;
  loading?:
    | boolean
    | {
        delay?: number | undefined;
      }
    | undefined;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: React.ReactNode;
};

export const Button: React.FC<Props> = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  onClick
}) => {
  return (
    <Form.Item>
      <AntButton
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
      >
        {children}
      </AntButton>
    </Form.Item>
  );
};
