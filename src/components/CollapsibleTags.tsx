import React, { useState, useRef, useEffect } from 'react';
import { Tag, Button, Flex, Space } from 'antd';

interface CollapsibleTagsProps {
  tags: string[];
  containerWidth: number;
}

const useCollapsibleTags = (containerWidth:  number) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hiddenCount, setHiddenCount] = useState(0);
    const tagsRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const calculateHiddenTags = () => {
        if (!tagsRef.current) return;
        
        const tagElements = tagsRef.current.querySelectorAll('.ant-tag');
        let totalWidth = 0;
        let hidden = 0;
  
        tagElements.forEach((tag) => {
          totalWidth += tag.getBoundingClientRect().width + 8; // 8px для margin
          if (totalWidth > containerWidth && !isExpanded) {
            (tag as HTMLElement).style.display = 'none';
            hidden++;
          } else {
            (tag as HTMLElement).style.display = 'inline-block';
          }
        });
        setHiddenCount(hidden);
     };
      calculateHiddenTags();
   }, [isExpanded, containerWidth]);

   return {
    tagsRef,
    isExpanded,
    hiddenCount,
    setIsExpanded
   }
}

const tags = ['1', '2', '3']
const CollapsibleTags: React.FC<CollapsibleTagsProps> = ({ tags, containerWidth }) => {

const {
    tagsRef,
    isExpanded,
    hiddenCount,
    setIsExpanded
   } = useCollapsibleTags(containerWidth)

  return (
   <Flex wrap="wrap" gap="small" align="center">
     <Space ref={tagsRef} style={{ display: 'flex', flexWrap: `${isExpanded? 'wrap' : 'nowrap'}`, gap: '8px' }}>
       {tags.map((tag, index) => (
         <Tag onClick={() => console.log(tag)} key={index}>{tag}</Tag>
       ))}
       {hiddenCount > 0 && !isExpanded && (
       <Button type="link" onClick={() => setIsExpanded(true)}>
         +{hiddenCount}
       </Button>
     )}
      {isExpanded && (
       <Button type="link" onClick={() => setIsExpanded(false)}>
         Свернуть
       </Button>
     )}
     </Space>
     
    
   </Flex>
 );
}

export default CollapsibleTags;

<Flex style={{ maxWidth: '300px' }}>
<CollapsibleTags tags={tags} containerWidth={300} />
</Flex>