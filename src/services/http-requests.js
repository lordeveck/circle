import axios from 'axios';
import toastr from 'toastr';


const isMeaningfulWord = async (answer) => {
    console.log(answer);
    const paramAnswer = encodeURI(answer.replaceAll('I', 'ı').toLowerCase());
    const response = await axios.get(`https://sozluk.gov.tr/gts?ara=${paramAnswer}`);

    if (response.data?.error) {
        toastr.error('Kelime bulunamadı.');
        return false;
    }

    return true;
};

export {
    isMeaningfulWord,
};
