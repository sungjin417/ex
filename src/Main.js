import React, { useState } from "react";
import "./css/Main.css";

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

const Category = ({ name, items, onSelect }) => (
  <div className="category-item">
    <h2>{name}</h2>
    <div>
      {items.map((item) => (
        <button key={item} onClick={() => onSelect(item)}>
          {item}
        </button>
      ))}
    </div>
  </div>
);

const dummyDrinkData = [
  { name: "소주", type: "주류", origin: "한국" },
  { name: "맥주", type: "주류", origin: "독일" },
  { name: "와인", type: "주류", origin: "프랑스" },
  { name: "위스키", type: "주류", origin: "스코틀랜드" },
];

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

const Main = () => {
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
    // 뒤로 가기 버튼 클릭 시, 해당 카테고리 수준으로 돌아가도록 설정
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
                        <button
                          key={menuCategory}
                          onClick={() => handleSelectMenuCategory(menuCategory)}
                        >
                          {menuCategory}
                        </button>
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
              ) 
              : (
                <div className="sub-category-container">
                  {Object.keys(categoryData[selectedCategory]).map(
                    (subCategory) => (
                      <button
                        key={subCategory}
                        onClick={() => handleSelectSubCategory(subCategory)}
                      >
                        {subCategory}
                      </button>
                    )
                  )}
                </div>
              )
              }
            </div>
          ) 
          : 
          (
            <div>
              <div className="sub-category-container">
                {categoryData[selectedCategory].map((subCategory) => (
                  <button
                    key={subCategory}
                    onClick={() => setSelectedSubCategory(subCategory)}
                  >
                    {subCategory}
                  </button>
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

export default Main;
