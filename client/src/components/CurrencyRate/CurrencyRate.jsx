import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";

export const ContentSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className='mt-16 w-11/12 max-w-maxContent mx-auto'>
        <Slider {...settings}>
      <div>
        <div>
          <img
            src="https://www.remitx.com/remitx-images/flags/NZD.png"
            alt=""
            title="flags"
            width="30"
            height="30"
          />
          <h6>NZD</h6>
        </div>
        <div className='flex flex-row'>
          <p>
            Remiwire Rate : <b>51.37</b>
          </p>
        </div>
      </div>

      <div>
        <div>
          <img
            src="https://www.remitx.com/remitx-images/flags/NZD.png"
            alt=""
            title="flags"
            width="30"
            height="30"
          />
          <h6>NZD</h6>
        </div>
        <div className='flex flex-row'>
          <p>
            Remiwire Rate : <b>51.38</b>
          </p>
        </div>
      </div>

      <div>
        <div>
          <img
            src="https://www.remitx.com/remitx-images/flags/NZD.png"
            alt=""
            title="flags"
            width="30"
            height="30"
          />
          <h6>NZD</h6>
        </div>
        <div className='flex flex-row'>
          <p>
            Remiwire Rate : <b>51.39</b>
          </p>
        </div>
      </div>

      <div>
        <div>
          <img
            src="https://www.remitx.com/remitx-images/flags/NZD.png"
            alt=""
            title="flags"
            width="30"
            height="30"
          />
          <h6>NZD</h6>
        </div>
        <div className='flex flex-row'>
          <p>
            Remiwire Rate : <b>51.40</b>
          </p>
        </div>
      </div>

      <div>
        <div>
          <img
            src="https://www.remitx.com/remitx-images/flags/NZD.png"
            alt=""
            title="flags"
            width="30"
            height="30"
          />
          <h6>NZD</h6>
        </div>
        <div className='flex flex-row'>
          <p>
            Remiwire Rate : <b>51.41</b>
          </p>
        </div>
      </div>

    </Slider>
</div>
  );
};

