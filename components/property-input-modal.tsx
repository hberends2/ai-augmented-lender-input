"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileUpload } from "@/components/ui/file-upload"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Partner {
  id: string
  name: string
  equity: string
}

export function PropertyInputModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [loanAmount, setLoanAmount] = useState("")
  const [roomsKeys, setRoomsKeys] = useState("")
  const [recourseYes, setRecourseYes] = useState(false)
  const [recourseNo, setRecourseNo] = useState(false)
  const [prepaymentYes, setPrepaymentYes] = useState(false)
  const [prepaymentNo, setPrepaymentNo] = useState(false)
  const [yieldMaintenanceYes, setYieldMaintenanceYes] = useState(false)
  const [yieldMaintenanceNo, setYieldMaintenanceNo] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [isFloating, setIsFloating] = useState(false)
  const [reserveRequirement, setReserveRequirement] = useState("")

  const handleNext = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleCancel = () => {
    setCurrentPage(1)
    onOpenChange(false)
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving data...")
    setCurrentPage(1)
    onOpenChange(false)
  }

  const calculateLoanPerKey = () => {
    const loan = Number.parseFloat(loanAmount.replace(/,/g, ""))
    const rooms = Number.parseFloat(roomsKeys)
    if (loan && rooms && rooms > 0) {
      return (loan / rooms).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
    return "0.00"
  }

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/,/g, "")
    if (numericValue && !isNaN(Number.parseFloat(numericValue))) {
      return Number.parseFloat(numericValue).toLocaleString("en-US")
    }
    return value
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">User Inputs - Setup</DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4].map((page) => (
              <div
                key={page}
                className={cn(
                  "h-2 flex-1 rounded-full transition-colors",
                  page === currentPage ? "bg-primary" : page < currentPage ? "bg-primary/50" : "bg-muted",
                )}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="mt-6">
          {/* Page 1: Property */}
          {currentPage === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">1. Property</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="propertyName">
                    Property Name<span className="text-red-500">*</span>
                  </Label>
                  <Input id="propertyName" placeholder="Enter property name" className="mt-1.5" required />
                </div>
                <div>
                  <Label htmlFor="propertyAddress">
                    Property Address<span className="text-red-500">*</span>
                  </Label>
                  <Input id="propertyAddress" placeholder="Enter property address" className="mt-1.5" required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">
                      City<span className="text-red-500">*</span>
                    </Label>
                    <Input id="city" placeholder="Enter city" className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="state">
                      State<span className="text-red-500">*</span>
                    </Label>
                    <Select required>
                      <SelectTrigger id="state" className="mt-1.5">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                        <SelectItem value="option4">Option 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zip">
                      Zip<span className="text-red-500">*</span>
                    </Label>
                    <Input id="zip" type="number" placeholder="Enter zip" className="mt-1.5" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="censusId">Census ID (STR)</Label>
                  <Input id="censusId" type="number" placeholder="Enter census ID" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="roomsKeys">
                    Rooms / Keys<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="roomsKeys"
                    type="number"
                    placeholder="Enter number of rooms"
                    className="mt-1.5"
                    required
                    value={roomsKeys}
                    onChange={(e) => setRoomsKeys(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input id="yearBuilt" type="number" maxLength={4} placeholder="YYYY" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="lastYearRenovated">Last Year Renovated</Label>
                    <Input id="lastYearRenovated" type="number" maxLength={4} placeholder="YYYY" className="mt-1.5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Page 2: Loan Details */}
          {currentPage === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">2. Loan Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loanNumber">Loan Number</Label>
                  <Input id="loanNumber" placeholder="Enter loan number" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="borrower">Borrower</Label>
                  <Input id="borrower" placeholder="Enter borrower" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="borrowerAddress">Borrower Contact Information</Label>
                  <Input id="borrowerAddress" placeholder="Address" className="mt-1.5" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="borrowerCity" className="sr-only">
                      City
                    </Label>
                    <Input id="borrowerCity" placeholder="City" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="borrowerState" className="sr-only">
                      State
                    </Label>
                    <Select>
                      <SelectTrigger id="borrowerState" className="mt-1.5">
                        <SelectValue placeholder="ST" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                        <SelectItem value="option4">Option 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="borrowerZip" className="sr-only">
                      Zip
                    </Label>
                    <Input id="borrowerZip" type="number" placeholder="Zip" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="annualFfeReserves">Annual FF&E Reserves</Label>
                  <Input id="annualFfeReserves" type="number" step="0.01" placeholder="$0.00" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="brand">Brand / Franchise</Label>
                  <Input id="brand" placeholder="Enter brand / franchise" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="management">Management</Label>
                  <Input id="management" placeholder="Enter management" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="fbOperator">F&B Operator</Label>
                  <Input id="fbOperator" placeholder="Enter F&B operator" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="assetManager">Asset Manager</Label>
                  <Input id="assetManager" placeholder="Enter asset manager" className="mt-1.5" />
                </div>
              </div>
            </div>
          )}

          {/* Page 3: Loan Terms */}
          {currentPage === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">3. Loan Terms</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input
                    id="loanAmount"
                    placeholder="0"
                    className="mt-1.5"
                    value={loanAmount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, "")
                      if (value === "" || !isNaN(Number.parseFloat(value))) {
                        setLoanAmount(value)
                      }
                    }}
                    onBlur={(e) => {
                      if (e.target.value) {
                        setLoanAmount(formatCurrency(e.target.value))
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="loanPerKey">Loan Amount / Key</Label>
                  <Input id="loanPerKey" className="mt-1.5 bg-muted" value={calculateLoanPerKey()} readOnly disabled />
                </div>
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input id="interestRate" type="number" step="0.001" placeholder="0.000" className="mt-1.5" />
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-sm font-medium mb-2 self-start ml-4">Rate Type</Label>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="fixed"
                          checked={isFixed}
                          onCheckedChange={(checked) => {
                            setIsFixed(checked as boolean)
                            if (checked) setIsFloating(false)
                          }}
                        />
                        <Label htmlFor="fixed" className="text-sm font-normal cursor-pointer">
                          Fixed
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="floating"
                          checked={isFloating}
                          onCheckedChange={(checked) => {
                            setIsFloating(checked as boolean)
                            if (checked) setIsFixed(false)
                          }}
                        />
                        <Label htmlFor="floating" className="text-sm font-normal cursor-pointer">
                          Floating
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="floatingRate">Floating Rate</Label>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-sm text-muted-foreground">Base +</span>
                      <div className="relative flex-1">
                        <Input
                          id="floatingRate"
                          type="number"
                          step="0.001"
                          placeholder="0.000"
                          className="pr-8"
                          disabled={!isFloating}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="term">Term</Label>
                    <Input id="term" type="number" placeholder="Enter term" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="interestOnly">Interest Only</Label>
                    <Input id="interestOnly" type="number" placeholder="0" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="amortization">Amortization</Label>
                    <Input id="amortization" type="number" placeholder="Enter amortization" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-1.5">
                    <Label htmlFor="reserveRequirement" className="text-sm font-medium">
                      Reserve Requirement
                    </Label>
                    <Label htmlFor="requiredDscr" className="text-sm font-medium">
                      Required DSCR
                    </Label>
                    <Label htmlFor="requiredDebtYield" className="text-sm font-medium">
                      Required Debt Yield (%)
                    </Label>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="relative">
                      <Input
                        id="reserveRequirement"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={reserveRequirement}
                        onChange={(e) => setReserveRequirement(e.target.value)}
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                    <div>
                      <Input id="requiredDscr" type="number" step="0.01" placeholder="0.00" />
                    </div>
                    <div>
                      <Input id="requiredDebtYield" type="number" step="0.001" placeholder="0.000" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="extensionTerm">Extension Term</Label>
                  <Input id="extensionTerm" type="number" placeholder="Enter extension term" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="extensionRequirements">Extension Requirements</Label>
                  <Textarea
                    id="extensionRequirements"
                    placeholder="Enter extension requirements"
                    className="mt-1.5 min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Recourse</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="recourseYes"
                          checked={recourseYes}
                          onCheckedChange={(checked) => {
                            setRecourseYes(checked as boolean)
                            if (checked) setRecourseNo(false)
                          }}
                        />
                        <Label htmlFor="recourseYes" className="text-sm font-normal cursor-pointer">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="recourseNo"
                          checked={recourseNo}
                          onCheckedChange={(checked) => {
                            setRecourseNo(checked as boolean)
                            if (checked) setRecourseYes(false)
                          }}
                        />
                        <Label htmlFor="recourseNo" className="text-sm font-normal cursor-pointer">
                          No
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Prepayment Allowed</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="prepaymentYes"
                          checked={prepaymentYes}
                          onCheckedChange={(checked) => {
                            setPrepaymentYes(checked as boolean)
                            if (checked) setPrepaymentNo(false)
                          }}
                        />
                        <Label htmlFor="prepaymentYes" className="text-sm font-normal cursor-pointer">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="prepaymentNo"
                          checked={prepaymentNo}
                          onCheckedChange={(checked) => {
                            setPrepaymentNo(checked as boolean)
                            if (checked) setPrepaymentYes(false)
                          }}
                        />
                        <Label htmlFor="prepaymentNo" className="text-sm font-normal cursor-pointer">
                          No
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Yield Maintenance</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="yieldMaintenanceYes"
                          checked={yieldMaintenanceYes}
                          onCheckedChange={(checked) => {
                            setYieldMaintenanceYes(checked as boolean)
                            if (checked) setYieldMaintenanceNo(false)
                          }}
                        />
                        <Label htmlFor="yieldMaintenanceYes" className="text-sm font-normal cursor-pointer">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="yieldMaintenanceNo"
                          checked={yieldMaintenanceNo}
                          onCheckedChange={(checked) => {
                            setYieldMaintenanceNo(checked as boolean)
                            if (checked) setYieldMaintenanceYes(false)
                          }}
                        />
                        <Label htmlFor="yieldMaintenanceNo" className="text-sm font-normal cursor-pointer">
                          No
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Page 4: Document Upload */}
          {currentPage === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">4. Document Upload</h3>
              <div className="space-y-6">
                <FileUpload
                  label="Financial Statements"
                  id="financialStatements"
                  accept=".pdf,.doc,.docx"
                  multiple={true}
                />
                <FileUpload label="Market Reports" id="marketReports" accept=".pdf,.doc,.docx" multiple={true} />
                <FileUpload label="Capital Plan" id="capitalPlan" accept=".pdf,.doc,.docx" multiple={true} />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <div>
            {currentPage > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            {currentPage < 4 ? <Button onClick={handleNext}>Next</Button> : <Button onClick={handleSave}>Save</Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
