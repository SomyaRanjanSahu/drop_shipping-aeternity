import React from 'react';

const DropshippingIntro = () => {
  const bgImage = 'https://images.unsplash.com/photo-1633699138575-00eb08c341ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRyb3BzaGlwcGluZ3xlbnwwfHwwfHx8MA%3D%3D';

  return (
    <div 
      className="max-w-4xl mx-auto p-5 rounded-lg shadow"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-gray-100 bg-opacity-90 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Explore Dropshipping Services</h2>
        <p className="mt-4 text-gray-600">Dropshipping is a streamlined retail fulfillment method where your store sells products without stocking them. When a product sells, you purchase it from a third party—usually a wholesaler or manufacturer—who then ships it directly to the customer. This model significantly reduces upfront inventory costs and risks.</p>
        
        <div className="mt-5">
          <h3 className="text-xl font-semibold text-gray-800">Why Choose Dropshipping?</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Low Startup Costs: Start your ecommerce store without investing in inventory.</li>
            <li>Easy to Scale: As you sell more, you don't need to worry about packing and shipping orders.</li>
            <li>Flexible Location: Manage your business from anywhere with an internet connection.</li>
            <li>Wide Selection of Products: Offer a diverse range of products without storage constraints.</li>
          </ul>
        </div>

        <div className="mt-5">
          <h3 className="text-xl font-semibold text-gray-800">Getting Started with Dropshipping</h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-600">
            <li>Choose a niche with high demand and low competition.</li>
            <li>Find reliable suppliers with quality products and reasonable shipping times.</li>
            <li>Set up your online store using a platform that supports dropshipping.</li>
            <li>Market your store through social media, SEO, and other digital marketing strategies.</li>
          </ol>
        </div>

        <div className="mt-5">
          <p className="text-gray-600">Our dropshipping service offers an extensive catalog of products, competitive pricing, and seamless integration with your online store. We provide the tools and support you need to grow your business efficiently.</p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">Start Your Dropshipping Business</button>
        </div>
      </div>
    </div>
  );
};

export default DropshippingIntro;
