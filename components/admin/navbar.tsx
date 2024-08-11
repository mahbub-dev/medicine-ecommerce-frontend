import Image from "next/image";

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md mb-1">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">Admin Dashboard</span>
        </div>

        {/* Middle Items */}
        {/* <div className="flex space-x-4">
          <a href="#" className="hover:text-green-400 transition-colors duration-200">
            Item 1
          </a>
          <a href="#" className="hover:text-green-400 transition-colors duration-200">
            Item 2
          </a>
        </div> */}

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABI1BMVEX////VQzTNPzHEOi3JPS7ZRTfdRzjjSjrhSTvQQTHGPC/GPS3MPjD///3gSTj//v/3/P29LhuVvuG71+1VmMqLtNX0+PzAOy0oj9BdoNAdgsOy0er0///COCbXWFLObWcYfbhLl88fj9fp9Pedze1+tNmMxez77/DTLhfhNx/SOildodMTh8rrxMLHMyDKWU/KYlfb6fJOksE3h78VfLyEv+d3uOVosORQo9wvltlGot6FsM53uuiYyu06isD99PPK4vPknpbbbWLVTD7hgHTnsav04uDsmo/gPSrjYU/019PleW/YLiLorKXwwrjsfnPYhHzscGXWfHXmycTLUUXoWEnNJAvclI3dt7a7Iwzbq6Tk19nD6v+s3/qX1Pay4PnPXF26hOK6AAAIZElEQVR4nO2cD1faShqHRwhigAjVlloF9Ypbw1wY67Za7WoRUUwpdL3CxeZ2d7vf/1PsOzMBEjIotj3mz77POZy2QGOe/pJ3Zt7JKSEIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiCIG2N3RcmLAyPoU/tFrK5ztre3+cvN34M+s1/Faq322zQfP/72dvt50Gf2izBWa2u+9wyDrMTKsGB4EO+/iJeh4v34GJJZhu9iVGlmGMY/QzSMDP+/hutoGBlW15SG8ZnTzMpwJTYZGqs7aBhx0DD6zDSMTS0FwxOl4dvYG9biYkjOZxm+evJT+VmMjdfAIXAkeC85Pplh+PaVgufPQ9xkrBwdnUqt4+PjD5wTyY7qnFdqtdr6hHeA6DG++8eTn/jcVE5PdyVnwChPSHRVZVj5m5KP2y+e/MTnBgwr7o7adHfNi+fzyVdehdrwcGxIeE+U5PNkpiBXBPLwnbyAyL8TesOfPkjIDQ/jbvj6Fxg+fxdqw9exzzD2hmdxNyzGxTDv/Npo7O015B/yYmwzzs/dIx98PP58/qOHwRAs8p3mRcsyTbNLP11etX1faXy5/mPJqgJp+HzvMUd/tR60IcTRuaEmXXBIUavbajZGH/P5S/2zZVnpdHopzbGs6qceTG7mzDF4Q9LZnOgJRcDqXjeIc4XWW93lpaVleAHptGPZnHdJ9HughhBQ4/NQ1xemDVMp2u2Jr7Q/VYXbslRMp8eOX+b7GcEaQkAm1ROAwtHchPut111eBFSO1X/myYw5uJuADZvDhC4NdZ9hitLOpZlanGWYtv7cm6OoBmmYJzcm95OOuj/FlEWloOO45HP0V10fARoa5IYlJoaK6zS1mLrfkCs+lGJghlDse12R3b0ppiaOiyrHpQdvxOAMSWeY8BqqUkw9lOIfD/2g4MbDfC6XSCR+OkWrV3Cu0/OdnZ01/qp5WKsFZXjDRopzp6i8Tq3RHO7w5GRnxJpLc30lCD2DtO2cpnlT1H8oRevSOebKyYfVDRWq9vETcMs0MHRi/JkUl6rOkLGy856omo0GCaTnvWdrgukUdT6Fm8zD53G0rmVIKyfH6p8VTFO/xxzDnP86NXv91qOuU6lwNsswGAZlTZtOUZDQabNQapuPuFKrdXHIs5P3AUu5adja2HAqxQWzUSiWNh9haF2LY4bLsP4spykcBQNCCoVr6q83izMcl/8Uxzz7EB7DPGmyjNIQXrRJjAapd+evqMtVMeaHyRDGinImk/EpihTNDunUyeRGnMNRjhfhMtwvZzPqFHUdCi3EyJSGKaWh1eHH3A2V4Ustk1WmmKA34P+ZkAtf78af4khRNjR2PxwFrTXGIMlkMqtMMWHWScPMwep/hqEqxWroDCFDMMxkvClKx2GefGHmHqmbuqKxMV1RheIow+MwGe6XZ6SoXxBySVmd7JneSeo9KaYtMeSHy3BLGI5TZGwUIusRouusSQpi6Bj7zVoSC0NZS8NkmCd3LJmcpMiavQHLiRTNNumYOoUkP1NnqaFTSq37HNOW6JBvhMjQIHVbGooQGY/gTRkUNb0FNYZBiKTQpE6TkW5VKl/pPQV1eUkcdeP9YbBaHtrSUKTIruCNQkOsF9kdIS24PO026Ys+FaTYKhVB0VTXG5GiXAOHy5AXU4mmvSSkv0XIX6CYhQlN2+RjxhcYM+QkgPZKhX6xdDEjRXCUhSZshs1nZYdhH9ZSww7MYmAyzgxyxRIJJ0uxXjTbhW/DSuWbnMZJtWUPllzWb5yGyrA92HeAa/TKLr8Ri+LyLUxmxDJKDBridwNSuDObpcotD5F2B5s+bkpFoBAyQzdtlszYEGJZs78SY8hLag7C7LGEXGqQFqV7IkRr69v5vwTfv3//N/AfDn/a7fT09Ci0hh0NFhraPr8TTVg22WJcFKMGNxR35gK9K5XuKL08ODiYKH6XivyZPum4G67HLJtbkoEtKioPkW0WyA0T4yIU2AbftuHDR49y42LRuqgcHNxtTfHfb5URc+y1PSUNW1aaZJYbZsWdCFekbDKKJcYADCmUnM0FqKgXpSJXubCoC6gy1WviexwxLHwdjYlyXOTltAEDpZyj6nDV3tKEbvbJntjf6PZKpVLxkk5NUpc/Ba0xE/j3vnnmNswOeARbzJmGm2Lc0Cn8InaJdfOu3RktGieG1qOey3hy3jxzp8j2+51bNlpp8GaGqel8+KBOA8c0p9tTC/CtsF2abgrGG0+KZWaXxy04KDUG08V6WJdDv3st5Rh2+86zRaHFo5jUXI2NDOOlhl+rdVM2+2XD3+PYrc/zqEKQ5MlUihPDnDbgG3BbYmqj3phaMEOfoE8x6WpP5ewGuRpekTxzNfw9KYJgyBN08KY4aWzwycwQ5jjmeFPKmyIIhrrKjJidIuuRAkxobqhn22acohn6e9CFOkUGAwUs/HRt0vB3pcgTjAoyxfGKODtOsQUXYaFjJ0bbxO4UI5UgR5mizftLd8yzbePshEcpQY46xSzjzYnM9N4bHzp4gkGf9GPxlhuZYnbQgAinN990MRuPnKAvRdFlLDON+XampOAjnvMODaoUFfuLCX1YL0QuQY46Rd/+orwHo5ggZ54U9WE/mglyplPkhpmJoVDMRbHIuHkoxVyUE+SoUnQrRj5Bzn0pasMYCN6b4jCi46CPGSlmhxGcqqlQNDakoR2XBDmqOWoc7sERyhSHEVsuPchUirFKUDKV4jAiTadH4VaMX4JT92IsE3QpvrSj1nSaH6loR6B1/6OICdwwKq37H4BfqHbsxkEPoNjsxDdBQazlBM5/hYQgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgSNT5H42yYprcCJvLAAAAAElFTkSuQmCC" // Replace with your profile image
            alt="User Profile"
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
          <span className="font-medium">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
