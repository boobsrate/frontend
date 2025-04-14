<template>
  <div class="seo-page">
    <div class="container">
      <h1>BoobsRate - The Best Place to Rate and Compare Boobs Online</h1>
      
      <section class="seo-section">
        <h2>Welcome to BoobsRate</h2>
        <p>
          BoobsRate is the premier platform for rating and comparing boobs online. Our community-driven platform allows users to vote for their favorite boobs and discover the top-rated boobs from around the world.
        </p>
        <p>
          Whether you're looking for the best boobs, want to participate in boobs rating, or simply enjoy comparing different types of boobs, BoobsRate has everything you need.
        </p>
      </section>
      
      <section class="seo-section">
        <h2>Top Boobs Categories</h2>
        <p>
          At BoobsRate, we offer various categories to explore:
        </p>
        <ul>
          <li><router-link to="/top/25">Top 25 Boobs</router-link> - The cream of the crop, featuring the 25 highest-rated boobs on our platform.</li>
          <li><router-link to="/top/100">Top 100 Boobs</router-link> - An extended collection of the 100 best-rated boobs.</li>
          <li><router-link to="/abyss/100">Abyss</router-link> - For those curious about the other end of the spectrum.</li>
        </ul>
      </section>
      
      <section class="seo-section">
        <h2>How Boobs Rating Works</h2>
        <p>
          Our boobs rating system is simple and fair:
        </p>
        <ol>
          <li>Browse through pairs of boobs images</li>
          <li>Click "LIKE" on the one you prefer</li>
          <li>Your votes contribute to our global rating algorithm</li>
          <li>The most liked boobs rise to the top of our rankings</li>
        </ol>
        <p>
          This democratic approach ensures that our top boobs truly represent the community's preferences.
        </p>
      </section>
      
      <section class="seo-section">
        <h2>Why Choose BoobsRate for Boobs Comparison?</h2>
        <p>
          BoobsRate stands out as the best platform for boobs comparison and rating for several reasons:
        </p>
        <ul>
          <li>Large and diverse collection of boobs images</li>
          <li>Fair and transparent rating system</li>
          <li>Active community of boobs enthusiasts</li>
          <li>Regular updates with new content</li>
          <li>User-friendly interface for seamless browsing and voting</li>
        </ul>
      </section>
      
      <section class="seo-section">
        <h2>Start Rating Boobs Today</h2>
        <p>
          Ready to join our community and start rating boobs? Head to our <router-link to="/">main page</router-link> to begin comparing and voting for your favorite boobs right away!
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeoPage',
  metaInfo: {
    title: 'BoobsRate - Rate and Compare Boobs Online | Top Boobs Rating',
    meta: [
      { name: 'description', content: 'Rate and compare the best boobs online. Vote for your favorite boobs and see the top rated boobs from around the world.' },
      { name: 'keywords', content: 'boobs, boobs rating, rate boobs, top boobs, best boobs, boobs comparison, compare boobs, breast rating, tits rating, boobsrate' }
    ]
  }
}
</script>

<style scoped>
.seo-page {
  padding: 40px 0;
  color: #dcddde;
  text-align: left;
}

.seo-section {
  margin-bottom: 40px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #fff;
  text-align: center;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #fff;
}

p, li {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

ul, ol {
  padding-left: 20px;
  margin-bottom: 20px;
}

a {
  color: #7289da;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
