import React, { Component } from 'react';
import catalogService from '../services/catalogSevice';


class DollDetail extends Component {

  state = {
    doll: {},
    loading: true,
  }

  async componentDidMount() {
    const { match: {params: { id }} } = this.props;
    try {
      const doll = await catalogService.getDollById(id)  
      this.setState({
        doll,
        loading: false,
      })
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { doll, loading } = this.state;
    console.log(doll.closeUpImage);
    return (
      <>
        {loading && <div>Loading...</div> }
        {!loading && 
        <div>
            <div>
             {doll.character} {doll.name} - {doll.subBrand}
            </div>
            <div>
              <img src="https://lh3.googleusercontent.com/TVQklh-UriQ6ZI1x99Qmi5oHKzsNDYliZcq5mKsKIAeeAFwIOSsZ8pc8RhTCDh-yPzwfAvau-2u0wb1CDZkDiuX1p6NNMSPrwwpVUEhU9Y88R9n5Mzk2zG8-SvaDj1K0wrMcNeYZxj-ey6MBUyxuDR6fO5-ldGT1E-a2B99VTFycKVePJ5MtXQSYe6PUpyAf_2Mlp4B-lSlC7mxRrqhnm-FKMZmytJ4QKgNBuMMhVWmsf9cf_Fz4jVhAa9F_P35mKtnnvSgMr7Qk_HMasSKJ755Z0FyMN4EzUol3Rry8zcGcdlQ3ly-S6RdL_oJCxNGJktuiYuAYqfy-uyDMMOndW5RVRj2F1RAulCoEeCyMQ9BlNFr-J_bIh22n5TT31H_9ZL2SoGx0MHyAlr5y-jbbTuPv6xWI7T_2O8fb0bambvVxUZ8-kPE7dkSm-U21ZO-2HM-VGwL_Kxh5ppvQnRwaKevfmJrDM85o3AyKl2D0q4KglKmCaG-DGV-HLs3qYR0otAVl3_VNQXw96PNaZ1z5o0u9CjeUiqKOxo6OFmnyieAOA2zDBzSZglZY2IJ-R38W78tqjh2KzG4MYONuEy9NSeNfsebc0jBn7dsqQ_zseaBoq61lq0QWYgjSJgF3ZAGGJZsEkp4EVXtpHb-iyG1s7WEy_YmoZDT1j0isktYTltInKOAMnEpecg=w600-h900-no" alt="doll"/> 
            </div>
            <div>
                <p>Mold: {doll.mold}</p>
                <p>Skin Tone: {doll.skinTone}</p>
                <p>Hair: {doll.hair}</p>
                <p>Edition Size: {doll.editionSize}</p>
                <p>Release Price: ${doll.releasePrice}</p>
              
            </div>
            


        </div> }
      </>
    );
  }
}

export default DollDetail;