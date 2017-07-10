// Develop dependencies
import {
  observable,
  computed,
  action,
  useStrict,
  autorun,
  runInAction
} from 'mobx';
import uuidV4 from 'uuid/v4';
// Custom dependencies
import LECTURES from './mock_data';

useStrict(true);

class Store {

  // Observable data

  @observable lectures = [];
  @observable
  filterInputs = {
    toggle: true,
    date: '',
    school: {
      buttonIsActive: false,
      schoolItems: []
    },
    lector: {
      buttonIsActive: false,
      lectorItems: []
    }
  };
  @observable activeUserInfoId = null;

  constructor() {
    this.initStore();
  }

  // Computed functions

  @computed
  get filterActiveSchools() {
    return this
      .filterInputs
      .school
      .schoolItems
      .filter(school => {
        return school.checked;
      });
  }

  @computed
  get filterActiveLectors() {
    return this
      .filterInputs
      .lector
      .lectorItems
      .filter(lector => {
        return lector.checked;
      });
  }

  @computed
  get filteredLectures() {
    // TODO: Каждый отдельный фильтр можно вынести в отдельные функции и импортировать их
    const dateInFilter = this.filterInputs.date;

    return this
      .lectures
    // Фильтр по дате
      .filter(lecture => {
        return dateInFilter === '' || lecture.date === dateInFilter;
      })
      // Фильтр по школам
      .filter(lecture => {
        if (this.filterActiveSchools.length === 0) 
          return true;
        return this
          .filterActiveSchools
          .some(filterSchool => {
            return lecture
              .schools
              .some(school => {
                return filterSchool.name === school;
              });
          });
      })
      // Фильтр по лекторам
      .filter(lecture => {
        if (this.filterActiveLectors.length === 0)
          return true;
        return this
          .filterActiveLectors
          .some(filterLector => {
            return filterLector.name === lecture.lectorInfo.name;
          });
      });
  }

  // Action functions

  @action
  initStore = async() => {
    let lectures = await this.getLecturesFromServer();
    let schoolsNames = this.getSchoolNamesFromLectures(lectures);
    let lectorsNames = lectures.map(lecture => lecture.lectorInfo.name);
    runInAction(() => {
      this.lectures = lectures;
      this.filterInputs.school.schoolItems = this.getItemsOfFilter(schoolsNames);
      this.filterInputs.lector.lectorItems = this.getItemsOfFilter(lectorsNames);
    });
  };

  /**
   * Приводит выбранную дату в фильтре к нужному виду (гггг.мм.дд) и сохраняет ее в store
   *
   * @param {Object} e Обьект события
   */
  @action
  syncDateInputWithStore = e => {
    let dateInputValue = e
      .target
      .value
      .replace(/-/g, '.');
    this.filterInputs.date = dateInputValue;
  };

  @action
  displayLectorInfoById = lectorId => {
    return action(() => {
      this.activeUserInfoId = lectorId;
    });
  };

  @action
  closeLectorInfo = () => {
    this.activeUserInfoId = null;
  };

  @action
  switchActivationFilterSchoolTitle = () => {
    let school = this.filterInputs.school;
    school.buttonIsActive = !school.buttonIsActive;
  };

  @action
  switchActivationFilterLectorTitle = () => {
    let lector = this.filterInputs.lector;
    lector.buttonIsActive = !lector.buttonIsActive;
  };

  @action
  switchActivationFilterToggle = () => {
    this.filterInputs.toggle = !this.filterInputs.toggle;
  };

  @action
  activateSchoolItemById = id => {
    return action(() => {
      let activeItem = this
        .filterInputs
        .school
        .schoolItems
        .find(school => {
          return id === school.id;
        });
      activeItem.checked = !activeItem.checked;
    });
  };

  @action
  activateLectorItemById = id => {
    return action(() => {
      let activeItem = this
        .filterInputs
        .lector
        .lectorItems
        .find(lector => {
          return id === lector.id;
        });
      activeItem.checked = !activeItem.checked;
    });
  };

  // Custom functions

  /**
   * Из данных о лекциях получает только названия школ 
   *
   * @param {Object[]} Массив с обьектами данных лекций
   * @return {String[]} Возвращает массив названий школ
   */
  getSchoolNamesFromLectures(lectures) {
    let schoolsNames = [];
    lectures
      .map(lecture => lecture.schools)
      .forEach(schoolList => {
        schoolsNames = [
          ...schoolsNames,
          ...schoolList
        ];
      });
    return schoolsNames;
  }

  /**
   * Преобразует входные данные в элементы фильтра
   *
   * @param {String[]} arrayNames Массив элементов фильтра
   * @return {Object[]} Массив с обьектами данных для элементов фильтра
   */
  getItemsOfFilter(arrayNames) {
    return makeUniqueItemsInArray(arrayNames).map(name => {
      return {name, checked: false, id: uuidV4()};
    });
  }

  getLecturesFromServer() {
    const pr = new Promise(resolve => {
      setTimeout(() => {
        resolve(LECTURES);
      }, 1000);
    });
    return pr;
  }

}

const store = new Store();
export default store;

/**
 * Если в массиве элементы дублируются, они удаляются.
 * Таким образом создается новый массив из уникальных элементов
 *
 * @param {Array} array Массив, в котором нужно сделать элементы уникальными
 */
function makeUniqueItemsInArray(array) {
  let obj = {};
  let uniqueArray = [];
  array.forEach(item => {
    obj[item] = true;
  });
  for (let key in obj) 
    uniqueArray.push(key);
  return uniqueArray;
}
