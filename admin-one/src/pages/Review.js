// src/ReviewComponent.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Address, ABI } from "./constants";

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const id = 7;

  // const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
  // const contract = new ethers.Contract(Address, ABI, provider);

  const handleAddReview = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(Address, ABI, signer);

      // Gọi hàm addReview trong smart contract để thêm đánh giá mới
      // const test = await contract.addReview(id, rating, content); // 1 là id sản phẩm, thay đổi tùy thuộc vào yêu cầu của smart contract
      // console.log(test);
      const transaction = await contract.addReview(id, rating, content);

      console.log("Transaction Hash:", transaction.hash);

      // Lấy receipt để kiểm tra trạng thái của giao dịch
      const receipt = await transaction.wait();
      console.log("Transaction Receipt:", receipt);
      const status = receipt.status;

      if (status === 1) {
        console.log("Review added successfully!");

        const event = receipt.events.find((e) => e.event === "ReviewAdded");

        if (event) {
          const { reviewId, reviewer, productId, rating, content } = event.args;
          console.log("Review Details:", {
            reviewId,
            reviewer,
            productId,
            rating,
            content,
          });

          // Hiển thị đánh giá mới thêm vào
          setReviews([...reviews, { reviewId, reviewer, productId, rating, content }]);
        }
      } else {
        console.error("Review addition failed. Status: ", status);
      }

    } catch (error) {
      console.error("Error adding review:", error.message);
    }
  };

  // const handleAddReview = async (id) => {
  //   try {
  //     const web3Modal = new Web3Modal();
  //     const provider = await web3Modal.connect();
  //     const web3 = new Web3(provider);

  //     const contract = new web3.eth.Contract(ABI, Address);
  //     const accounts = await web3.eth.getAccounts();
  //     const signer = accounts[0];

  //     const transaction = await contract.methods.addReview(id, rating, content).send({ from: signer });

  //     console.log("Mã Giao Dịch:", transaction.transactionHash);

  //     const receipt = await transaction.wait();
  //     console.log("Biên Nhận Giao Dịch:", receipt);

  //     const status = receipt.status;

  //     if (status === "0x1") {
  //       // setReview({
  //       //   productId: id,
  //       //   reviewer: signer,
  //       //   rating: rating,
  //       //   comment: content,
  //       // });

  //       console.log("Đã Thêm Nhận Xét Thành Công!");

  //       const event = receipt.events.ReviewAdded;

  //       if (event) {
  //         const { reviewId, reviewer, productId, rating, content } = event.returnValues;
  //         console.log("Chi Tiết Nhận Xét:", {
  //           reviewId,
  //           reviewer,
  //           productId,
  //           rating,
  //           content,
  //         });
  //       }
  //     } else {
  //       console.error("Thêm Nhận Xét Thất Bại. Trạng Thái: ", status);
  //     }

  //     // await handleReviewProduct({ id, review });
  //   } catch (error) {
  //     console.error("Lỗi khi thêm nhận xét:", error.message);
  //   }
  // };


  const fetchReviews = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const contract = new ethers.Contract(Address, ABI, provider);

      // Gọi hàm getProductReviews trong smart contract để lấy danh sách đánh giá theo ID sản phẩm
      const productReviewsIndexes = await contract.getReviewsByProductId(1, { gasLimit: 300000 });
      console.log(productReviewsIndexes);
      // Lặp qua chỉ số đánh giá và gọi hàm getReview để lấy thông tin chi tiết



    } catch (error) {
      console.error("Error getting product reviews:", error.message);
    }
  };

  // ... (các phần khác của component)


  return (
    <div>
      <h2>Product Reviews</h2>
      <div>
        <label>Rating:</label>
        <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
      </div>
      <div>
        <label>Review:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button onClick={handleAddReview}>Add Review</button><br />
      <button onClick={fetchReviews}>Get Review</button>
      <div>
        {reviews?.map((review, index) => (
          <div key={index}>
            <p>Rating: {review.rating}</p>
            <p>Content: {review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewComponent;
