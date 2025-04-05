import { Card, Typography } from "antd";
import { posts } from "./data";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

const useVirtualSubstitutions = () => {
  const virtualizerConfig = {
    count: posts.length,
    estimateSize: () => 100,
  };

  const virtualizer = useWindowVirtualizer(virtualizerConfig);

  return {
    virtualItems: virtualizer.getVirtualItems(),
    getTotalSize: virtualizer.getTotalSize,
    measureElement: virtualizer.measureElement,
  };
};

function App() {
  const { virtualItems, getTotalSize, measureElement } =
    useVirtualSubstitutions();

  return (
    <div style={{ width: "100%", overflow: "auto" }}>
      <div style={{ position: "relative", height: `${getTotalSize()}px` }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
          }}
        >
          {virtualItems.map(({ key, index }) => {
            const post = posts[index];

            return (
              <div key={key} data-index={index} ref={measureElement}>
                <Card
                  style={{
                    padding: 10,
                    marginBottom: "6px",
                    background: "tomato",
                  }}
                >
                  <Typography.Text>{post.body}</Typography.Text>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
