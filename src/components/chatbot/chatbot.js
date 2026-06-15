const chatbot = await createChatbot({
    learningRate: 0.3,
    temperature: 0.7
  });
  
  // Train with your custom data
  await chatbot.train(yourTrainingData);
  
  // Process user messages
  const response = await chatbot.process("Hello there", "user123");
  console.log(response.message.text);
