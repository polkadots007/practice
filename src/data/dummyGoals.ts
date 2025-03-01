const dummyGoals = [
    {
      id: "1",
      title: "Drink 2L of Water",
      description: "Stay hydrated by drinking at least 2 liters of water daily.",
      category: "Health",
      severityColor: "#3498db", // Blue - Medium priority
      image: "https://unsplash.com/photos/a-woman-sitting-on-the-floor-drinking-a-bottle-of-water-nrSsFpryYrM",
      target: 7,
      progress: 3,
      completed: false,
      createdAt: new Date(),
      createdBy: "adminuser@test-habitor.com"
    },
    {
      id: "2",
      title: "Exercise for 30 Minutes",
      description: "Do a workout or a physical activity for at least 30 minutes.",
      category: "Fitness",
      severityColor: "#e74c3c", // Red - High priority
      image: "https://unsplash.com/photos/a-woman-in-a-red-sports-bra-top-stretching-her-arms-y0-m0VsPrUU",
      target: 5,
      progress: 1,
      completed: false,
      createdAt: new Date(),
      createdBy: "adminuser@test-habitor.com"
    },
    {
      id: "3",
      title: "Read for 20 Minutes",
      description: "Read a book, article, or educational content.",
      category: "Personal Growth",
      severityColor: "#f1c40f", // Yellow - Low priority
      image: "https://unsplash.com/photos/a-woman-in-a-white-coat-holding-a-notebook-and-a-watch-NGsJFmPayVs",
      target: 7,
      progress: 4,
      completed: false,
      createdAt: new Date(),
      createdBy: "adminuser@test-habitor.com"
    },
    {
      id: "4",
      title: "Meditate for 10 Minutes",
      description: "Practice mindfulness or meditation for at least 10 minutes.",
      category: "Mental Wellness",
      severityColor: "#2ecc71", // Green - Relaxing priority
      image: "https://unsplash.com/photos/woman-doing-yoga-meditation-on-brown-parquet-flooring-NTyBbu66_SI",
      target: 5,
      progress: 5,
      completed: true,
      createdAt: new Date(),
      createdBy: "adminuser@test-habitor.com"
    },
    {
      id: "5",
      title: "Wake Up Before 7 AM",
      description: "Start your day early for better productivity.",
      category: "Productivity",
      severityColor: "#e67e22", // Orange - Medium priority
      image: "https://unsplash.com/photos/a-book-and-a-cup-of-coffee-on-a-bed-Ut0GJ9E3Q9c",
      target: 7,
      progress: 6,
      completed: false,
      createdAt: new Date(),
      createdBy: "adminuser@test-habitor.com"
    },
    {
      id: "6",
      title: "Journal Your Thoughts",
      description: "Write at least 5 sentences about your day.",
      category: "Mental Wellness",
      severityColor: "#9b59b6", // Purple - Medium priority
      image: "https://unsplash.com/photos/a-person-writing-on-a-notebook-with-a-pen-X90spJyvGi8",
      target: 5,
      progress: 2,
      completed: false,
      createdAt: new Date(),
      createdBy: "adminuser@test-habitor.com"
    },
    {
      id: "7",
      title: "No Junk Food",
      description: "Avoid processed or unhealthy food for the day.",
      category: "Health",
      severityColor: "#e74c3c", // Red - High priority
      image: "https://unsplash.com/photos/a-white-bowl-filled-with-a-salad-and-a-fork-ifO6JKkclLI",
      target: 6,
      progress: 4,
      completed: false,
      createdAt: new Date(),
      createdBy: "adminuser@test-habitor.com"
    },
    {
      id: "8",
      title: "Practice a New Skill",
      description: "Spend at least 30 minutes on a new skill (coding, language, music).",
      category: "Personal Growth",
      severityColor: "#f39c12", // Yellow - Low priority
      image: "https://unsplash.com/photos/low-light-photography-of-woman-in-gray-knit-sweatshirt-writing-on-desk-OxU08SFhPbI",
      target: 4,
      progress: 1,
      completed: false,
      createdAt: new Date(),
      createdBy: "adminuser@test-habitor.com"
    },
    {
      id: "9",
      title: "Sleep for 8 Hours",
      description: "Ensure you get enough rest by sleeping at least 8 hours.",
      category: "Health",
      severityColor: "#3498db", // Blue - Medium priority
      image: "https://source.unsplash.com/400x300/?sleep,bedtime",
      target: 7,
      progress: 5,
      completed: false,
      createdAt: new Date(),
      createdBy: "user001@test-habitor.com"
    },
    {
      id: "10",
      title: "Limit Social Media to 1 Hour",
      description: "Reduce screen time and be more productive.",
      category: "Productivity",
      severityColor: "#e67e22", // Orange - Medium priority
      image: "https://source.unsplash.com/400x300/?socialmedia,phone",
      target: 6,
      progress: 3,
      completed: false,
      createdAt: new Date(),
      createdBy: "user001@test-habitor.com"
    },
    {
      id: "11",
      title: "Stretch for 10 Minutes",
      description: "Improve flexibility and reduce stiffness by stretching daily.",
      category: "Fitness",
      severityColor: "#e74c3c", // Red - High priority
      image: "https://unsplash.com/photos/woman-in-black-sports-bra-and-blue-denim-jeans-doing-yoga-amgv9YUg-MA",
      target: 5,
      progress: 2,
      completed: false,
      createdAt: new Date(),
      createdBy: "adminuser@test-habitor.com"
    },
    {
      id: "12",
      title: "Write a Gratitude Journal",
      description: "List 3 things you are grateful for each day.",
      category: "Mental Wellness",
      severityColor: "#2ecc71", // Green - Relaxing priority
      image: "https://unsplash.com/photos/today-i-am-grateful-book-M4lve6jR26E",
      target: 7,
      progress: 5,
      completed: false,
      createdAt: new Date(),
      createdBy: "adminuser@test-habitor.com"
    },
    {
      id: "13",
      title: "Eat a Healthy Breakfast",
      description: "Start your day with a nutritious meal.",
      category: "Health",
      severityColor: "#e74c3c", // Red - High priority
      image: "https://source.unsplash.com/400x300/?healthy,breakfast",
      target: 7,
      progress: 6,
      completed: false,
      createdAt: new Date(),
      createdBy: "user001@test-habitor.com"
    },
    {
      id: "14",
      title: "Spend 30 Minutes Outside",
      description: "Get fresh air and sunlight to boost mood and health.",
      category: "Lifestyle",
      severityColor: "#3498db", // Blue - Medium priority
      image: "https://source.unsplash.com/400x300/?nature,outdoors",
      target: 6,
      progress: 3,
      completed: false,
      createdAt: new Date(),
      createdBy: "user001@test-habitor.com"
    },
    {
      id: "15",
      title: "Reduce Sugar Intake",
      description: "Cut down on added sugar for better health.",
      category: "Health",
      severityColor: "#e74c3c", // Red - High priority
      image: "https://source.unsplash.com/400x300/?sugar,healthy",
      target: 7,
      progress: 2,
      completed: false,
      createdAt: new Date(),
      createdBy: "user001@test-habitor.com"
    },
    {
      id: "16",
      title: "Listen to a Podcast",
      description: "Spend at least 20 minutes listening to an educational or motivational podcast.",
      category: "Personal Growth",
      severityColor: "#f1c40f", // Yellow - Low priority
      image: "https://source.unsplash.com/400x300/?podcast,audio",
      target: 5,
      progress: 1,
      completed: false,
      createdAt: new Date(),
      createdBy: "user001@test-habitor.com"
    },
    {
      id: "17",
      title: "Declutter for 10 Minutes",
      description: "Organize a small part of your home daily.",
      category: "Productivity",
      severityColor: "#e67e22", // Orange - Medium priority
      image: "https://source.unsplash.com/400x300/?cleaning,organizing",
      target: 4,
      progress: 2,
      completed: false,
      createdAt: new Date(),
      createdBy: "user001@test-habitor.com"
    },
    {
      id: "18",
      title: "Connect with a Friend or Family Member",
      description: "Strengthen relationships by checking in with someone close.",
      category: "Social",
      severityColor: "#9b59b6", // Purple - Medium priority
      image: "https://source.unsplash.com/400x300/?friends,family",
      target: 6,
      progress: 4,
      completed: false,
      createdAt: new Date(),
      createdBy: "user001@test-habitor.com"
    },
  ];
  
  export default dummyGoals;
  