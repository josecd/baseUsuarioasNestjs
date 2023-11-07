import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { Repository } from "typeorm";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepositorio: Repository<Company>
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const newCompany = await this.companyRepositorio.create(createCompanyDto);
    await this.companyRepositorio.save(newCompany);
    return newCompany;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const companyFound = await this.companyRepositorio.findOne({
      where: {
        id
      }
    });
    if (!companyFound) {
      return new HttpException("Company no found", HttpStatus.NOT_FOUND);
    } else {
      const updateReporte = Object.assign(companyFound, updateCompanyDto);
      return this.companyRepositorio.save(updateReporte);
    }
  }

  async remove(id: number) {
    const companyFound = await this.companyRepositorio.findOne({
      where: {
        id: id
      }
    });
    if (!companyFound) {
      return new HttpException("Company no found", HttpStatus.NOT_FOUND);
    } else {
      const updateReporte = Object.assign(companyFound, { is_active: 0 });
      return this.companyRepositorio.save(updateReporte);
    }
  }
  async getAllCompany() {
    const companyFound = await this.companyRepositorio.find();
    return companyFound;
  }
}
