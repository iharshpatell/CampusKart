import React from 'react';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id === id)
    );
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`;
    navigate(url);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#27667B] via-[#1E4F5F] to-[#12303A]"> {/* Gradient background */}
      {/* Hero Section */}
      <div className="py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            CampusKart
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-6 animate-fade-in">
            Buy, Sell & Donate within Your Campus – <br />
            <span className="font-semibold text-blue-200">
              Smart, Simple, Sustainable!
            </span>
          </p>
          
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {loadingCategory
            ? new Array(6).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-md animate-pulse"
                >
                  <div className="bg-gray-200 h-24 rounded mb-2"></div>
                  <div className="bg-gray-200 h-6 rounded"></div>
                </div>
              ))
            : categoryData.map((cat) => (
                <div
                  key={cat._id}
                  className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300" // Smooth hover effect
                  onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-24 object-cover rounded mb-4"
                  />
                  <p className="text-center font-semibold text-gray-800">
                    {cat.name}
                  </p>
                </div>
              ))}
        </div>
      </div>

      {/* Category-wise Product Display */}
      <div className="container mx-auto px-4 py-12">
        {categoryData?.map((c) => (
          <CategoryWiseProductDisplay key={c?._id} id={c?._id} name={c?.name} />
        ))}
      </div>
    </section>
  );
};

export default Home;