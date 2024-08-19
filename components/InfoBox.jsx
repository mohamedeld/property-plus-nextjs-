import Link from "next/link"

const InfoBox = ({href,description,title,btnTitle,bgColor,btnStyle}) => {
  return (
    <div class={`${bgColor} p-6 rounded-lg shadow-md`}>
          <h2 class="text-2xl font-bold">{title}</h2>
          <p class="mt-2 mb-4">
            {description}
          </p>
          <Link
            href={href}
            class={`inline-block  text-white rounded-lg px-4 py-2 ${btnStyle}`}
          >
            {btnTitle}
          </Link>
        </div>
  )
}

export default InfoBox