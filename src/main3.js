import React, { useState } from "react";
import "./css/Main.css";

// 이미지를 import 합니다.
import happyImage from "./images/happy.png";
import angryImage from "./images/angry.png";
import sadImage from "./images/sad.png";
import loveImage from "./images/love.png";
import sunnyImage from "./images/sunny.png";
import cloudyImage from "./images/cloudy.png";
import rainyImage from "./images/rainy.png";
import snowyImage from "./images/snowy.png";
import koreanFoodImage from "./images/koreanFood.png";
import chineseFoodImage from "./images/chineseFood.png";
import westernFoodImage from "./images/westernFood.png";
import japaneseFoodImage from "./images/japaneseFood.png";

const categoryData = {
  기분: ["행복", "분노", "슬픔", "사랑"],
  날씨: ["맑음", "흐림", "비", "눈"],
  음식: {
    한식: ["불고기", "비빔밥", "김치찌개", "된장찌개"],
    중식: ["짜장면", "짬뽕", "탕수육", "양장피"],
    양식: ["스테이크", "파스타", "피자", "리조또"],
    일식: ["초밥", "라면", "우동", "돈부리"],
  },
};

// 각 버튼을 렌더링하는 컴포넌트입니다.
const CategoryButton = ({ text, onClick, imagePath, alt }) => (
  <button onClick={onClick}>
    <img src={imagePath} alt={alt} />
    {text}
  </button>
);

// 카테고리를 보여주는 컴포넌트입니다.
const Category = ({ name, items, onSelect }) => (
  <div className="category-item">
    <h2>{name}</h2>
    <div>
      {items.map((item) => (
        <CategoryButton
          key={item}
          text={item}
          onClick={() => onSelect(item)}
          imagePath={getImagePath(item)}
          alt={item}
        />
      ))}
    </div>
  </div>
);

// 선택된 카테고리에 따라 해당하는 이미지의 경로를 반환하는 함수입니다.
const getImagePath = (item) => {
  switch (item) {
    case "행복":
      return happyImage;
    case "분노":
      return angryImage;
    case "슬픔":
      return sadImage;
    case "사랑":
      return loveImage;
    case "맑음":
      return sunnyImage;
    case "흐림":
      return cloudyImage;
    case "비":
      return rainyImage;
    case "눈":
      return snowyImage;
    case "한식":
      return koreanFoodImage;
    case "중식":
      return chineseFoodImage;
    case "양식":
      return westernFoodImage;
    case "일식":
      return japaneseFoodImage;
    default:
      return null;
  }
};

// 술 정보를 보여주는 컴포넌트입니다.
const DrinkList = ({ drinks }) => (
  <div>
    <h2>술 정보 리스트</h2>
    <ul>
      {drinks.map((drink) => (
        <li key={drink.name}>
          <strong>{drink.name}</strong> - {drink.type}, {drink.origin}
        </li>
      ))}
    </ul>
  </div>
);

const dummyDrinkData = [
  { name: "소주", type: "주류", origin: "한국" },
  { name: "맥주", type: "주류", origin: "독일" },
  { name: "와인", type: "주류", origin: "프랑스" },
  { name: "위스키", type: "주류", origin: "스코틀랜드" },
];

const Main3 = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedMenuCategory, setSelectedMenuCategory] = useState("");

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory("");
    setSelectedMenuCategory("");
  };

  const handleSelectSubCategory = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSelectedMenuCategory("");
  };

  const handleSelectMenuCategory = (menuCategory) => {
    setSelectedMenuCategory(menuCategory);
  };

  const handleGoBack = () => {
    if (selectedMenuCategory) {
      setSelectedMenuCategory("");
    } else if (selectedSubCategory) {
      setSelectedSubCategory("");
    } else {
      setSelectedCategory("");
    }
  };

  return (
    <div>
      <h1>술 정보 앱</h1>
      {selectedCategory && (
        <div>
          <h2>선택한 대 카테고리: {selectedCategory}</h2>
          {selectedCategory === "음식" ? (
            <div>
              {selectedSubCategory ? (
                <div>
                  <h3>선택한 중 카테고리: {selectedSubCategory}</h3>
                  <div className="sub-category-container">
                    {categoryData[selectedCategory][selectedSubCategory].map(
                      (menuCategory) => (
                        <CategoryButton
                          key={menuCategory}
                          text={menuCategory}
                          onClick={() => handleSelectMenuCategory(menuCategory)}
                          imagePath={getImagePath(menuCategory)}
                          alt={menuCategory}
                        />
                      )
                    )}
                  </div>
                  {selectedMenuCategory && (
                    <div>
                      <h4>선택한 소 카테고리: {selectedMenuCategory}</h4>
                      <DrinkList drinks={dummyDrinkData} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="sub-category-container">
                  {Object.keys(categoryData[selectedCategory]).map(
                    (subCategory) => (
                      <CategoryButton
                        key={subCategory}
                        text={subCategory}
                        onClick={() => handleSelectSubCategory(subCategory)}
                        imagePath={getImagePath(subCategory)}
                        alt={subCategory}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="sub-category-container">
                {categoryData[selectedCategory].map((subCategory) => (
                  <CategoryButton
                    key={subCategory}
                    text={subCategory}
                    onClick={() => setSelectedSubCategory(subCategory)}
                    imagePath={getImagePath(subCategory)}
                    alt={subCategory}
                  />
                ))}
                {selectedSubCategory && (
                  <div>
                    <h3>선택한 중 카테고리: {selectedSubCategory}</h3>
                    <DrinkList drinks={dummyDrinkData} />
                  </div>
                )}
              </div>
            </div>
          )}
          {selectedCategory && (
            <button onClick={handleGoBack}>뒤로 가기</button>
          )}
        </div>
      )}
      {!selectedCategory && (
        <div className="category-container">
          <Category
            name="카테고리"
            items={Object.keys(categoryData)}
            onSelect={handleSelectCategory}
          />
        </div>
      )}
    </div>
  );
};

export default Main3;
