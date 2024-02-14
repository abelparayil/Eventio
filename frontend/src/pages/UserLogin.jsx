import loginImage from "../assets/images/login.png";
const UserLogin = () => {
  return (
    <div>
      <div className="flex h-screen bg-ghostWhite">     
  <div className="w-full bg-gray-100 lg:w-7/12 flex items-center justify-center">
    <div className="max-w-md w-full p-6">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center bg-[url('../assets/images/login.png')]">Sign In to Eventio</h1>
      <div className="mt-4 flex flex-col lg:flex-row items-center justify-center">
        <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
          <button type="button" className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4" id="google">
              <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
              <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
              <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
              <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
            </svg> Sign In with Google </button>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>or with email</p>
      </div>
      <div className="mt-4 flex flex-col lg:flex-row items-center justify-center">
      </div>
      <div>
       <form action="#" method="POST" class="space-y-4">
         <div>
           <label for="usernameoremail" className="block text-sm font-medium text-gray-700">Username or Email</label>
           <input type="email" name="password" placeholder="Enter mail or username"className="mt-1 p-2 w-full rounded-md placeholder:text-sm focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
         </div>
         <div>
          <div className="flex justify-between">
           <label for="password" className="block text-sm font-medium ">Password</label>
           <label for="password" className="order-last block text-sm font-medium text-grey">Forgot your password?</label>
          </div>
          <input type="password" name="password" placeholder="Enter your password" className="mt-1 p-2 w-full rounded-md placeholder:text-sm focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
         </div>
         <div>
           <button type="submit" className="w-full bg-bluePurple text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign In</button>
         </div>
         <div>
         <label for="password" className="hidden max-lg:flex justify-center block text-sm font-medium text-grey">Don't have an account?<b> Sign Up</b></label>
         </div>
      </form>
      </div>

    </div>
  </div>
  <div className="hidden lg:flex items-center justify-center flex-1 text-black ">
  <img src={loginImage} alt="presentation" className="scale-x-105 h-full w-screen object-none blur-[2px]"/>
  <div className="grid flex flex-col absolute text-center  justify-items-center  pt-52">
        <h1 className=" font-sansita text-4xl text-white font-bold italic">
          Are you new here?
        </h1>
        <h2 className="font-sansita text-4xl text-white text-sm p-8">
        To keep connected with us provide us with your information 
        </h2>
        <button type="submit" className="w-32 bg-opacity-75 bg-mercury text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">SignUp</button>
  </div>
  </div>
</div>
</div>
  );
};

export default UserLogin;
