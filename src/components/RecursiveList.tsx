import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

interface ListItem {
  id: string | number;
  title: string;
  children?: ListItem[];
}

interface RecursiveListProps {
  items: ListItem[];
}

const RecursiveList: React.FC<RecursiveListProps> = ({ items }) => {
  const renderItems = (items: ListItem[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <Collapse.Panel 
            key={item.id} 
            header={item.title}
            // expandIcon={({ isActive }) => (
            //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
            // )}
          >
            <RecursiveList items={item.children} />
          </Collapse.Panel>
        );
      }
      return <div key={item.id} style={{ padding: '8px 16px' }}>{item.title}</div>;
    });
  };

  return <Collapse>{renderItems(items)}</Collapse>;
};

export default RecursiveList;