
const Footer = () => {
  return (
    <div className="bg-indigo-600 px-16 py-10">
        <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl font-bold text-white tracking-tight">
                HoliDays For You
            </span>
            <span className="text-white font-bold flex gap-4">
                <p className="cursor-pointer">
                    Privacy Policy
                </p>
                <p className="cursor-pointer">
                    Terms and Conditions
                </p>
            </span>
        </div>
    </div>
  )
}

export default Footer;