import { useState, useEffect } from 'react';
import { LayoutGrid, ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const Navigate = useNavigate();
  // State management for easy API integration
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated API call - Replace with actual API endpoint
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/products/${productId}`);
        // const data = await response.json();
        
        // Mock data matching the image
        const mockData = {
          id: 1,
          name: "Prefilter RO Service Kit Pre-filter Housing Bowl + 2 Pcs. Spun Filter + SS Inlet Ball Valveeflon 1/4\" + 3 Meter RO Pipe + 2 Ro Tap + 1/4\" Connector For Water Purifier, Solid Filter Cartridge",
          price: 899.00,
          currency: "₹",
          warranty: "NA",
          mainImage: "/productDetailimg1.png",
          thumbnails: [
            "/productDetailimg1.png",
            "/productDetailimg1.png",
            "/productDetailimg1.png"
          ],
          description: [
            "Lorem ipsum dolor sit amet consectetur. Netus bibendum duis lorem ullamcorper id. Amet mattis eu fringilla nibh interdum. Tempus turpis enim blandit eget viverra nulla. Vulputate nisi dignissim ipsum ornare non. Ullamcorper vitae leo dictum a sollicitudin quisque. Varius sed maecenas donec lobortis eu ornare arcu fermentum. Aliquam maecenas non neque accumsan tristique turpis. Commodo facilisis nunc in scelerisque aenean dolor felis in odio. Non massa lacus auctor sit cursus mus egestas. Porta sem aenean adipiscing nibh risus enim.",
            "Pharetra sit in risus felis dictum enim suspendisse sodales. Lobortis aliquam morbi tortor aliquet pretium eu. Porta dapibus tristique sit fringilla ut eleifend. Condimentum feugiat et massa odio sit. Odio imperdiet dignissim posuere est quis ornare lorem dui amet. Facilisis gravida morbi sed porttitor a amet tempor.",
            "Eget sed ultrices mauris aliquam sed senectus quam sed imperdiet. Arcu enim est facilisis consectetur. Facilisis."
          ]
        };
        
        setProduct(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
     
        {/* Breadcrumb */}
              <div className="flex items-center gap-2  text-sm p-4 text-gray-600">
                <button 
                  onClick={() => console.log('Navigate to home')}
                  className="hover:text-gray-900 transition-colors"
                >
                  <Home size={16} />
                </button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <button onClick={()=>{Navigate("/products")}} className="text-gray-900 font-medium cursor-pointer">Product</button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <button className="text-gray-900 font-medium cursor-pointer">Product Details</button>
              </div>

      {/* Main Content */}
      <div className="px-6 py-2">
        <h1 className="text-lg font-semibold text-gray-900 mb-2">Product Details</h1>

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left Column - Images (2 columns) */}
            <div className="lg:col-span-2 p-8 bg-white">
              {/* Main Image */}
              <div className="bg-white rounded-lg mb-6 flex items-center justify-center border border-gray-200">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-4 justify-start">
                {product.thumbnails.map((thumb, idx) => (
                  <div
                    key={idx}
                    className="w-24 h-24 bg-white border border-gray-200 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <img
                      src={thumb}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info (3 columns) */}
            <div className="lg:col-span-3 p-8 bg-white border-l border-gray-200">
              {/* Product Title */}
              <h2 className="text-base font-semibold text-gray-900 leading-relaxed mb-6">
                {product.name}
              </h2>

              {/* Price and Warranty */}
              <div className="flex items-center mb-8">
                <span className="text-2xl font-normal text-teal-500">
                  {product.currency}{product.price.toFixed(2)}
                </span>
                <span className="mx-3 text-gray-800 text-3xl">•</span>
                <span className="text-base text-gray-700">
                  Warranty: {product.warranty}
                </span>
              </div>

              {/* Description Section */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
                <hr className='mb-2 text-gray-300'/>
                <div className="space-y-4">
                  {product.description.map((paragraph, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-gray-700 mr-3 flex-shrink-0 leading-relaxed">•</span>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;