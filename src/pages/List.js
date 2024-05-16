import styled from "styled-components";
import React, { useState } from "react";
import img1 from "../pages/images/와인/맥주/pexels-catchavibe-1400255.jpg";
import img2 from "../pages/images/와인/맥주/pexels-dorte-237774.jpg";
import img3 from "../pages/images/와인/맥주/pexels-edwardeyer-667986.jpg";
import img4 from "../pages/images/와인/맥주/pexels-elevate-1267289.jpg";
import bg from "../pages/images/와인/맥주/pexels-elevate-1267682.jpg";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  background-image: url(${bg});
  background-size: cover;
  position: relative;

  h1 {
    width: 200px;
    background-color: gray;
    font-size: 24px;
    margin: auto;
    margin-bottom: 20px;
    border-radius: 20px;
    text-align: center;
  }
`;

const WineContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 30px;
`;

const WineItem = styled.div`
  width: ${({ isBig }) => (isBig ? "900px" : "400px")};
  height: ${({ isBig }) => (isBig ? "1500px" : "300px")};
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  top: ${({ isBig }) => (isBig ? "100px" : "0")};
  position: ${({ isBig }) => (isBig ? "absolute" : "relative")};
  z-index: ${({ isBig }) => (isBig ? "2" : "1")};
`;

const ItemTitle = styled.p`
  font-weight: bold;
  margin: 0;
  font-size: 30px;
`;

const WineItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyComponent = () => {
  const [isBig, setIsBig] = useState(null);
  const [images, setImages] = useState([img1, img2, img3, img4]);

  const toggleSize = (index) => {
    setIsBig(isBig === index ? null : index);
  };

  const handleClick = () => {
    setImages([...images, img1]); // 새 이미지를 추가합니다.
  };

  return (
    <Container>
      <h1>와인 목록</h1>
      <WineContainer>
        {images.map((image, index) => (
          <WineItem
            key={index}
            onClick={() => toggleSize(index)}
            isBig={isBig === index}
            bgColor={`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 1)`}
          >
            <Wrapper>
              <ItemTitle>{`와인 ${index + 1}`}</ItemTitle>
              {isBig === index && (
                <div>
                  <WineItemImage src={image} alt={`와인 ${index + 1}`} />
                  <WineItemImage src={image} alt={`와인 ${index + 1}`} />
                  <WineItemImage src={image} alt={`와인 ${index + 1}`} />
                  <WineItemImage src={image} alt={`와인 ${index + 1}`} />
                </div>
              )}
            </Wrapper>
          </WineItem>
        ))}
      </WineContainer>
      <button onClick={handleClick}>이미지 추가</button>
    </Container>
  );
};

export default MyComponent;
